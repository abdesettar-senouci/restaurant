import React, { useState } from "react";
import { Calendar, Clock, Users, User, Phone, Mail } from "lucide-react";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    specialRequests: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const timeSlots = [
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
  ];

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
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (!formData.guests) newErrors.guests = "Number of guests is required";

    // Check if date is in the future
    if (formData.date) {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = "Please select a future date";
      }
    }

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

    console.log("Booking submitted:", formData);
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: "",
      specialRequests: "",
    });
    setIsSubmitted(false);
    setErrors({});
  };

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "0 auto",
      padding: "2rem",
      backgroundColor: "white",
      borderRadius: "15px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    },
    header: {
      textAlign: "center",
      marginBottom: "2rem",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: "0.5rem",
    },
    subtitle: {
      color: "#6b7280",
      fontSize: "1rem",
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
    inputFocus: {
      borderColor: "#f97316",
    },
    inputError: {
      borderColor: "#ef4444",
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
      minHeight: "100px",
      resize: "vertical",
      fontFamily: "inherit",
      transition: "border-color 0.2s ease",
      outline: "none",
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
    },
    submitButtonHover: {
      backgroundColor: "#ea580c",
      transform: "translateY(-2px)",
    },
    submitButtonDisabled: {
      backgroundColor: "#9ca3af",
      cursor: "not-allowed",
      transform: "none",
    },
    successMessage: {
      textAlign: "center",
      padding: "2rem",
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
  };

  if (isSubmitted) {
    return (
      <div style={styles.container}>
        <div style={styles.successMessage}>
          <div style={styles.successIcon}>🎉</div>
          <h2 style={styles.successTitle}>Booking Confirmed!</h2>
          <p style={styles.successText}>
            Thank you for your reservation! We've sent a confirmation email to{" "}
            {formData.email}. We look forward to serving you on{" "}
            {new Date(formData.date).toLocaleDateString()} at {formData.time}.
          </p>
          <button
            style={styles.resetButton}
            onClick={resetForm}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#374151")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#1f2937")}
          >
            Make Another Booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Reserve Your Table</h2>
        <p style={styles.subtitle}>
          Book your perfect dining experience with us
        </p>
      </div>

      <form style={styles.form} onSubmit={handleSubmit}>
        {/* Personal Information Row */}
        <div style={styles.row}>
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
            {errors.email && <span style={styles.error}>{errors.email}</span>}
          </div>
        </div>

        {/* Phone Number */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            <Phone size={16} />
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            style={{
              ...styles.input,
              ...(errors.phone ? styles.inputError : {}),
            }}
            onFocus={(e) => (e.target.style.borderColor = "#f97316")}
            onBlur={(e) =>
              (e.target.style.borderColor = errors.phone
                ? "#ef4444"
                : "#e5e7eb")
            }
            placeholder="Enter your phone number"
          />
          {errors.phone && <span style={styles.error}>{errors.phone}</span>}
        </div>

        {/* Date and Time Row */}
        <div style={styles.row}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <Calendar size={16} />
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              min={new Date().toISOString().split("T")[0]}
              style={{
                ...styles.input,
                ...(errors.date ? styles.inputError : {}),
              }}
              onFocus={(e) => (e.target.style.borderColor = "#f97316")}
              onBlur={(e) =>
                (e.target.style.borderColor = errors.date
                  ? "#ef4444"
                  : "#e5e7eb")
              }
            />
            {errors.date && <span style={styles.error}>{errors.date}</span>}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <Clock size={16} />
              Time
            </label>
            <select
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              style={{
                ...styles.select,
                ...(errors.time ? styles.inputError : {}),
              }}
              onFocus={(e) => (e.target.style.borderColor = "#f97316")}
              onBlur={(e) =>
                (e.target.style.borderColor = errors.time
                  ? "#ef4444"
                  : "#e5e7eb")
              }
            >
              <option value="">Select time</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            {errors.time && <span style={styles.error}>{errors.time}</span>}
          </div>
        </div>

        {/* Number of Guests */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            <Users size={16} />
            Number of Guests
          </label>
          <select
            name="guests"
            value={formData.guests}
            onChange={handleInputChange}
            style={{
              ...styles.select,
              ...(errors.guests ? styles.inputError : {}),
            }}
            onFocus={(e) => (e.target.style.borderColor = "#f97316")}
            onBlur={(e) =>
              (e.target.style.borderColor = errors.guests
                ? "#ef4444"
                : "#e5e7eb")
            }
          >
            <option value="">Select number of guests</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? "Guest" : "Guests"}
              </option>
            ))}
          </select>
          {errors.guests && <span style={styles.error}>{errors.guests}</span>}
        </div>

        {/* Special Requests */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Special Requests (Optional)</label>
          <textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleInputChange}
            style={styles.textarea}
            onFocus={(e) => (e.target.style.borderColor = "#f97316")}
            onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
            placeholder="Any special requests, dietary requirements, or celebration details..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            ...styles.submitButton,
            ...(isSubmitting ? styles.submitButtonDisabled : {}),
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) {
              e.target.style.backgroundColor =
                styles.submitButtonHover.backgroundColor;
              e.target.style.transform = styles.submitButtonHover.transform;
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
          {isSubmitting ? "Processing..." : "Reserve Table"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
