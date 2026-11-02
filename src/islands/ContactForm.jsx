import { useRef, useState } from "react";
import { business } from "@/data/business";
const emptyForm = {
  name: "",
  email: "",
  phone: "",
  propertyAddress: "",
  projectType: "",
  message: "",
  website: "",
};
export default function ContactForm({ deliveryAvailable = true }) {
  const [form, setForm] = useState({ ...emptyForm });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [failure, setFailure] = useState("");
  const resultRef = useRef(null);
  const change = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
  };
  const submit = async (event) => {
    event.preventDefault();
    if (status === "sending" || !deliveryAvailable) return;
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "Please enter a valid email address.";
    if (
      !/^[+()\d .-]{7,30}$/.test(form.phone.trim()) ||
      form.phone.replace(/\D/g, "").length < 7
    )
      next.phone = "Please enter a phone number we can call.";
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(Object.keys(next)[0])?.focus();
      return;
    }
    setStatus("sending");
    setFailure("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok || data.success !== true) throw new Error("delivery");
      setStatus("sent");
      setForm({ ...emptyForm });
      requestAnimationFrame(() => resultRef.current?.focus());
    } catch {
      setStatus("error");
      setFailure(
        "Your request could not be sent. Your details are still here. Please call or email us so your inquiry reaches us.",
      );
      requestAnimationFrame(() => resultRef.current?.focus());
    }
  };
  if (!deliveryAvailable)
    return (
      <div className="side-note" role="status">
        <h3>Call or email your project details.</h3>
        <p>
          Online requests are temporarily unavailable. Please call us, or email
          your property location and a short description of the work.
        </p>
        <a
          className="btn-primary"
          style={{ marginTop: 24 }}
          href={business.phoneHref}
        >
          Call {business.phone}
        </a>
        <a
          className="contact-email"
          href={`mailto:${business.email}?subject=Apartment%20renovation%20inquiry`}
        >
          Email your project details →
        </a>
      </div>
    );
  if (status === "sent")
    return (
      <div className="form-success" role="status" tabIndex={-1} ref={resultRef}>
        <h3>Your inquiry has been sent.</h3>
        <p>
          Thank you for sharing the details. If your project is time-sensitive,
          please call {business.phone}.
        </p>
        <button
          className="btn-outline"
          type="button"
          onClick={() => setStatus("idle")}
        >
          Send another inquiry
        </button>
      </div>
    );
  const field = (id, label, type, autoComplete) => (
    <div className="form-field">
      <label htmlFor={id}>
        {label} <span>(required)</span>
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        value={form[id]}
        onChange={change}
        required
        maxLength={id === "name" ? 120 : id === "phone" ? 30 : 254}
        aria-invalid={errors[id] ? "true" : undefined}
        aria-describedby={errors[id] ? `${id}-error` : undefined}
      />
      {errors[id] && (
        <p id={`${id}-error`} className="form-error">
          {errors[id]}
        </p>
      )}
    </div>
  );
  return (
    <form onSubmit={submit} noValidate>
      <div className="form-grid">
        {field("name", "Your name", "text", "name")}
        {field("phone", "Phone number", "tel", "tel")}
        {field("email", "Email address", "email", "email")}
        <div className="form-field">
          <label htmlFor="propertyAddress">
            Property location <span>(optional)</span>
          </label>
          <input
            id="propertyAddress"
            name="propertyAddress"
            autoComplete="street-address"
            value={form.propertyAddress}
            onChange={change}
            maxLength={300}
            placeholder="Address or city"
          />
        </div>
        <div className="form-field field-wide">
          <label htmlFor="projectType">
            What are you planning? <span>(optional)</span>
          </label>
          <select
            id="projectType"
            name="projectType"
            value={form.projectType}
            onChange={change}
          >
            <option value="">Still figuring it out</option>
            {[
              "Unit interior renovation",
              "Full gut rehab",
              "Common areas & amenities",
              "Exterior improvements",
              "Phased renovation program",
              "Construction management",
            ].map((scope) => (
              <option key={scope}>{scope}</option>
            ))}
          </select>
        </div>
        <div className="form-field field-wide">
          <label htmlFor="message">
            Tell us a little about the work <span>(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            maxLength={5000}
            value={form.message}
            onChange={change}
            placeholder="Number of units, what needs work, and any timing or access constraints."
          />
        </div>
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Leave this field blank</label>
          <input
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={change}
          />
        </div>
      </div>
      {failure && (
        <div className="form-alert" role="alert" tabIndex={-1} ref={resultRef}>
          <p>{failure}</p>
          <a href={business.phoneHref}>Call {business.phone}</a> ·{" "}
          <a href={`mailto:${business.email}`}>Email us</a>
        </div>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary form-submit"
      >
        {status === "sending"
          ? "Sending your inquiry…"
          : "Send project inquiry →"}
      </button>
      <p className="form-disclosure">
        Your details are used to respond to this project inquiry. Please don’t
        include payment information or resident details.
      </p>
    </form>
  );
}
