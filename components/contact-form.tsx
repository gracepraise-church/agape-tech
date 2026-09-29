"use client";

import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { contactServices, projectStages } from "@/lib/contact/options";
import {
  ContactRequestError,
  submitContactInquiry,
  type ContactValidationErrors,
} from "@/lib/contact-submission";
import { TurnstileWidget } from "@/components/turnstile-widget";

type SubmissionState =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "submitted" }
  | { status: "error"; message: string; fields?: ContactValidationErrors };

type ContactFormProps = {
  turnstileSiteKey?: string;
};

export function ContactForm({ turnstileSiteKey = "" }: ContactFormProps) {
  const [submission, setSubmission] = useState<SubmissionState>({ status: "idle" });
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileError, setTurnstileError] = useState("");
  const [turnstileInstance, setTurnstileInstance] = useState(0);
  const statusRef = useRef<HTMLDivElement>(null);
  const fieldErrors = submission.status === "error" ? submission.fields ?? {} : {};

  useEffect(() => {
    if (submission.status !== "idle" && submission.status !== "sending") {
      statusRef.current?.focus();
    }
  }, [submission]);

  const handleTurnstileTokenChange = useCallback((token: string) => {
    setTurnstileToken(token);
    if (token) setTurnstileError("");
  }, []);

  const handleTurnstileError = useCallback(() => {
    setTurnstileError("The security check could not load. Please refresh the check and try again.");
  }, []);

  const handleFieldChange = () => {
    if (submission.status !== "sending") setSubmission({ status: "idle" });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) {
      setSubmission({
        status: "error",
        message: "Complete the required fields before submitting.",
        fields: { _form: "Complete the required fields before submitting." },
      });
      requestAnimationFrame(() => {
        form.querySelector<HTMLElement>(":invalid")?.focus();
      });
      return;
    }
    if (turnstileSiteKey && !turnstileToken) {
      setTurnstileError("Complete the security check before submitting.");
      return;
    }

    const formData = new FormData(form);
    setSubmission({ status: "sending" });
    try {
      const result = await submitContactInquiry({
        name: String(formData.get("name") ?? "").trim(),
        email: String(formData.get("email") ?? "").trim(),
        organization: String(formData.get("organization") ?? "").trim(),
        service: String(formData.get("service") ?? ""),
        projectStage: String(formData.get("projectStage") ?? ""),
        summary: String(formData.get("summary") ?? "").trim(),
        website: String(formData.get("website") ?? ""),
        ...(turnstileSiteKey ? { turnstileToken } : {}),
      });
      setSubmission(result);
      if (result.status === "submitted") {
        form.reset();
        setTurnstileToken("");
        setTurnstileError("");
        setTurnstileInstance((instance) => instance + 1);
      }
    } catch (error) {
      const message =
        error instanceof ContactRequestError
          ? error.message
          : "We couldn’t submit this inquiry right now. Your entries are still here; please try again.";
      const fields = error instanceof ContactRequestError ? error.fields : undefined;
      if (fields?.turnstileToken) {
        setTurnstileToken("");
        setTurnstileInstance((instance) => instance + 1);
      }
      setSubmission({
        status: "error",
        message,
        fields,
      });
      const formFields = ["name", "email", "organization", "service", "projectStage", "summary"];
      const firstField = Object.keys(fields ?? {}).find((field) => formFields.includes(field));
      if (firstField) {
        requestAnimationFrame(() => {
          form.querySelector<HTMLElement>(`[name="${firstField}"]`)?.focus();
        });
      }
    }
  };

  return (
    <form className="contact-form" noValidate onChange={handleFieldChange} onSubmit={handleSubmit}>
      <div className="contact-form-heading">
        <span className="eyebrow">
          <span aria-hidden="true" className="eyebrow-mark" />
          PROJECT DETAILS
        </span>
        <p>Share only what you’re comfortable discussing in an initial conversation.</p>
      </div>
      <div aria-hidden="true" className="contact-honeypot">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input autoComplete="off" id="contact-website" name="website" tabIndex={-1} />
      </div>
      <div className="contact-fields">
        <label className="contact-field" htmlFor="contact-name">
          <span>Name <i aria-hidden="true">*</i></span>
          <input
            aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
            aria-invalid={Boolean(fieldErrors.name)}
            autoComplete="name"
            id="contact-name"
            maxLength={120}
            name="name"
            placeholder="Your name"
            required
          />
          {fieldErrors.name && <span className="field-error" id="contact-name-error">{fieldErrors.name}</span>}
        </label>
        <label className="contact-field" htmlFor="contact-email">
          <span>Business email <i aria-hidden="true">*</i></span>
          <input
            aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
            aria-invalid={Boolean(fieldErrors.email)}
            autoComplete="email"
            id="contact-email"
            maxLength={254}
            name="email"
            placeholder="you@company.com"
            required
            type="email"
          />
          {fieldErrors.email && <span className="field-error" id="contact-email-error">{fieldErrors.email}</span>}
        </label>
        <label className="contact-field" htmlFor="contact-organization">
          <span>Company / organization <i aria-hidden="true">*</i></span>
          <input
            aria-describedby={fieldErrors.organization ? "contact-organization-error" : undefined}
            aria-invalid={Boolean(fieldErrors.organization)}
            autoComplete="organization"
            id="contact-organization"
            maxLength={160}
            name="organization"
            placeholder="Organization name"
            required
          />
          {fieldErrors.organization && (
            <span className="field-error" id="contact-organization-error">{fieldErrors.organization}</span>
          )}
        </label>
        <label className="contact-field" htmlFor="contact-service">
          <span>Service needed <i aria-hidden="true">*</i></span>
          <select
            aria-describedby={fieldErrors.service ? "contact-service-error" : undefined}
            aria-invalid={Boolean(fieldErrors.service)}
            defaultValue=""
            id="contact-service"
            name="service"
            required
          >
            <option disabled value="">Choose a service</option>
            {contactServices.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {fieldErrors.service && <span className="field-error" id="contact-service-error">{fieldErrors.service}</span>}
        </label>
        <label className="contact-field" htmlFor="contact-stage">
          <span>Project stage <i aria-hidden="true">*</i></span>
          <select
            aria-describedby={fieldErrors.projectStage ? "contact-stage-error" : undefined}
            aria-invalid={Boolean(fieldErrors.projectStage)}
            defaultValue=""
            id="contact-stage"
            name="projectStage"
            required
          >
            <option disabled value="">Choose a stage</option>
            {projectStages.map((stage) => (
              <option key={stage} value={stage}>{stage}</option>
            ))}
          </select>
          {fieldErrors.projectStage && (
            <span className="field-error" id="contact-stage-error">{fieldErrors.projectStage}</span>
          )}
        </label>
        <label className="contact-field contact-field-full" htmlFor="contact-summary">
          <span>Project summary <i aria-hidden="true">*</i></span>
          <textarea
            aria-describedby={[
              "contact-summary-hint",
              fieldErrors.summary ? "contact-summary-error" : "",
            ].filter(Boolean).join(" ") || undefined}
            aria-invalid={Boolean(fieldErrors.summary)}
            id="contact-summary"
            maxLength={4000}
            minLength={20}
            name="summary"
            placeholder="What are you hoping to build, improve, or understand?"
            required
            rows={5}
          />
          <span className="field-hint" id="contact-summary-hint">A few sentences is a helpful place to start.</span>
          {fieldErrors.summary && (
            <span className="field-error" id="contact-summary-error">{fieldErrors.summary}</span>
          )}
        </label>
        {turnstileSiteKey && (
          <TurnstileWidget
            error={fieldErrors.turnstileToken ?? turnstileError}
            key={turnstileInstance}
            onError={handleTurnstileError}
            onTokenChange={handleTurnstileTokenChange}
            siteKey={turnstileSiteKey}
          />
        )}
      </div>
      <div className="contact-form-bottom">
        <button className="button button-primary contact-submit" disabled={submission.status === "sending"} type="submit">
          {submission.status === "sending" ? (
            <>
              <LoaderCircle aria-hidden="true" className="submit-spinner" size={17} />
              Submitting…
            </>
          ) : (
            <>
              Start the conversation <ArrowRight aria-hidden="true" size={16} />
            </>
          )}
        </button>
        <p>
          We’ll confirm when your inquiry is accepted. If delivery isn’t configured, your entries stay here.
        </p>
      </div>
      <div aria-atomic="true" aria-live="polite" className="form-status" ref={statusRef} tabIndex={-1}>
        {submission.status === "error" && (
          <p className="form-status-message is-error" role="alert">{submission.message}</p>
        )}
        {submission.status === "submitted" && (
          <p className="form-status-message is-success">
            <CheckCircle2 aria-hidden="true" size={17} />
            Your inquiry was accepted for delivery. Thank you for reaching out.
          </p>
        )}
      </div>
    </form>
  );
}
