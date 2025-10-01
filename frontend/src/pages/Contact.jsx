import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  User,
  MessageSquare,
} from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Contact form submitted:", formData);
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    setIsSubmitted(false);
    setErrors({});
  };

  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "2rem",
    },
    header: {
      textAlign: "center",
      marginBottom: "3rem",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: "1rem",
    },
    subtitle: {
      color: "#6b7280",
      fontSize: "1.1rem",
      maxWidth: "600px",
      margin: "0 auto",
      lineHeight: "1.6",
    },
    contentGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "3rem",
      marginBottom: "3rem",
    },
    contactInfo: {
      backgroundColor: "white",
      padding: "2rem",
      borderRadius: "15px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      height: "fit-content",
    },
    contactInfoTitle: {
      fontSize: "1.5rem",
      fontWeight: "600",
      color: "#1f2937",
      marginBottom: "1.5rem",
    },
    contactInfoList: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
    },
    contactInfoItem: {
      display: "flex",
      alignItems: "flex-start",
      gap: "1rem",
    },
    contactIcon: {
      color: "#f97316",
      marginTop: "2px",
      flexShrink: 0,
    },
    contactDetails: {
      display: "flex",
      flexDirection: "column",
    },
    contactLabel: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#374151",
      marginBottom: "4px",
    },
    contactValue: {
      color: "#6b7280",
      fontSize: "14px",
      lineHeight: "1.5",
    },
    formContainer: {
      backgroundColor: "white",
      padding: "2rem",
      borderRadius: "15px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    },
    formTitle: {
      fontSize: "1.5rem",
      fontWeight: "600",
      color: "#1f2937",
      marginBottom: "1.5rem",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
    },
    row: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "1rem",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
    label: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#374151",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    input: {
      padding: "12px 16px",
      border: "2px solid #e5e7eb",
      borderRadius: "8px",
      fontSize: "14px",
      transition: "border-color 0.2s ease",
      outline: "none",
    },
    select: {
      padding: "12px 16px",
      border: "2px solid #e5e7eb",
      borderRadius: "8px",
      fontSize: "14px",
      backgroundColor: "white",
      cursor: "pointer",
      transition: "border-color 0.2s ease",
      outline: "none",
    },
    textarea: {
      padding: "12px 16px",
      border: "2px solid #e5e7eb",
      borderRadius: "8px",
      fontSize: "14px",
      minHeight: "120px",
      resize: "vertical",
      fontFamily: "inherit",
      transition: "border-color 0.2s ease",
      outline: "none",
    },
    inputError: {
      borderColor: "#ef4444",
    },
    error: {
      color: "#ef4444",
      fontSize: "12px",
      marginTop: "0.25rem",
    },
    submitButton: {
      backgroundColor: "#f97316",
      color: "white",
      border: "none",
      padding: "14px 32px",
      borderRadius: "20px 8px 20px 8px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      marginTop: "1rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
    },
    submitButtonDisabled: {
      backgroundColor: "#9ca3af",
      cursor: "not-allowed",
      transform: "none",
    },
    mapSection: {
      backgroundColor: "white",
      borderRadius: "15px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      height: "400px",
    },
    mapContainer: {
      width: "100%",
      height: "100%",
      background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
    mapPlaceholder: {
      color: "white",
      fontSize: "4rem",
      opacity: 0.8,
    },
    mapOverlay: {
      position: "absolute",
      bottom: "20px",
      left: "20px",
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      padding: "1rem",
      borderRadius: "8px",
      backdropFilter: "blur(10px)",
    },
    mapAddress: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#1f2937",
      marginBottom: "4px",
    },
    mapSubAddress: {
      fontSize: "12px",
      color: "#6b7280",
    },
    successMessage: {
      textAlign: "center",
      padding: "2rem",
      backgroundColor: "white",
      borderRadius: "15px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    },
    successIcon: {
      fontSize: "4rem",
      marginBottom: "1rem",
    },
    successTitle: {
      fontSize: "1.5rem",
      fontWeight: "600",
      color: "#059669",
      marginBottom: "1rem",
    },
    successText: {
      color: "#6b7280",
      marginBottom: "2rem",
      lineHeight: "1.6",
    },
    resetButton: {
      backgroundColor: "#1f2937",
      color: "white",
      border: "none",
      padding: "12px 24px",
      borderRadius: "20px 8px 20px 8px",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    mobileStack: {
      "@media (max-width: 768px)": {
        gridTemplateColumns: "1fr",
        gap: "2rem",
      },
    },
  };

  const responsiveCSS = `
    @media (max-width: 768px) {
      .content-grid {
        grid-template-columns: 1fr !important;
        gap: 2rem !important;
      }
      .form-row {
        grid-template-columns: 1fr !important;
      }
      .contact-title {
        font-size: 2rem !important;
      }
      .container-padding {
        padding: 1rem !important;
      }
    }
    @media (max-width: 480px) {
      .contact-title {
        font-size: 1.8rem !important;
      }
    }
  `;

  if (isSubmitted) {
    return (
      <div style={styles.container} className="container-padding">
        <style>{responsiveCSS}</style>
        <div style={styles.successMessage}>
          <div style={styles.successIcon}>✉️</div>
          <h2 style={styles.successTitle}>Message Sent Successfully!</h2>
          <p style={styles.successText}>
            Thank you for contacting us! We've received your message and will
            get back to you within 24 hours at {formData.email}.
          </p>
          <button
            style={styles.resetButton}
            onClick={resetForm}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#374151")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#1f2937")}
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container} className="container-padding">
      <style>{responsiveCSS}</style>

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title} className="contact-title">
          Get In Touch
        </h1>
        <p style={styles.subtitle}>
          Have a question, feedback, or special request? We'd love to hear from
          you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      {/* Main Content Grid */}
      <div style={styles.contentGrid} className="content-grid">
        {/* Contact Information */}
        <div style={styles.contactInfo}>
          <h2 style={styles.contactInfoTitle}>Contact Information</h2>
          <div style={styles.contactInfoList}>
            <div style={styles.contactInfoItem}>
              <MapPin style={styles.contactIcon} size={20} />
              <div style={styles.contactDetails}>
                <div style={styles.contactLabel}>Address</div>
                <div style={styles.contactValue}>
                  123 Culinary Street
                  <br />
                  Downtown District
                  <br />
                  City, State 12345
                </div>
              </div>
            </div>

            <div style={styles.contactInfoItem}>
              <Phone style={styles.contactIcon} size={20} />
              <div style={styles.contactDetails}>
                <div style={styles.contactLabel}>Phone</div>
                <div style={styles.contactValue}>
                  +1 (555) 123-4567
                  <br />
                  +1 (555) 987-6543
                </div>
              </div>
            </div>

            <div style={styles.contactInfoItem}>
              <Mail style={styles.contactIcon} size={20} />
              <div style={styles.contactDetails}>
                <div style={styles.contactLabel}>Email</div>
                <div style={styles.contactValue}>
                  info@restaurant.com
                  <br />
                  reservations@restaurant.com
                </div>
              </div>
            </div>

            <div style={styles.contactInfoItem}>
              <Clock style={styles.contactIcon} size={20} />
              <div style={styles.contactDetails}>
                <div style={styles.contactLabel}>Hours</div>
                <div style={styles.contactValue}>
                  Monday - Thursday: 5:00 PM - 10:00 PM
                  <br />
                  Friday - Saturday: 5:00 PM - 11:00 PM
                  <br />
                  Sunday: 4:00 PM - 9:00 PM
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div style={styles.formContainer}>
          <h2 style={styles.formTitle}>Send Us a Message</h2>
          <div style={styles.form}>
            {/* Name and Email Row */}
            <div style={styles.row} className="form-row">
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <User size={16} />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={{
                    ...styles.input,
                    ...(errors.name ? styles.inputError : {}),
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#f97316")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = errors.name
                      ? "#ef4444"
                      : "#e5e7eb")
                  }
                  placeholder="Enter your full name"
                />
                {errors.name && <span style={styles.error}>{errors.name}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <Mail size={16} />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{
                    ...styles.input,
                    ...(errors.email ? styles.inputError : {}),
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#f97316")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = errors.email
                      ? "#ef4444"
                      : "#e5e7eb")
                  }
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <span style={styles.error}>{errors.email}</span>
                )}
              </div>
            </div>

            {/* Phone and Subject Row */}
            <div style={styles.row} className="form-row">
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <Phone size={16} />
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={styles.input}
                  onFocus={(e) => (e.target.style.borderColor = "#f97316")}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                  placeholder="Enter your phone number"
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <MessageSquare size={16} />
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  style={{
                    ...styles.select,
                    ...(errors.subject ? styles.inputError : {}),
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#f97316")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = errors.subject
                      ? "#ef4444"
                      : "#e5e7eb")
                  }
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="reservation">Reservation</option>
                  <option value="feedback">Feedback</option>
                  <option value="complaint">Complaint</option>
                  <option value="catering">Catering</option>
                  <option value="private-events">Private Events</option>
                  <option value="other">Other</option>
                </select>
                {errors.subject && (
                  <span style={styles.error}>{errors.subject}</span>
                )}
              </div>
            </div>

            {/* Message */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                style={{
                  ...styles.textarea,
                  ...(errors.message ? styles.inputError : {}),
                }}
                onFocus={(e) => (e.target.style.borderColor = "#f97316")}
                onBlur={(e) =>
                  (e.target.style.borderColor = errors.message
                    ? "#ef4444"
                    : "#e5e7eb")
                }
                placeholder="Tell us more about your inquiry..."
              />
              {errors.message && (
                <span style={styles.error}>{errors.message}</span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              style={{
                ...styles.submitButton,
                ...(isSubmitting ? styles.submitButtonDisabled : {}),
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.target.style.backgroundColor = "#ea580c";
                  e.target.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.target.style.backgroundColor =
                    styles.submitButton.backgroundColor;
                  e.target.style.transform = "none";
                }
              }}
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <Send size={16} />
                  Send Message
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div style={styles.mapSection}>
        <div style={styles.mapContainer}>
          <div style={styles.mapPlaceholder}>🗺️</div>
          <div style={styles.mapOverlay}>
            <div style={styles.mapAddress}>123 Culinary Street</div>
            <div style={styles.mapSubAddress}>Downtown District, City</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
