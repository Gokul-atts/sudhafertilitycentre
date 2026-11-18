

// "use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { appointmentSchema } from "@/schemas/appointmentSchema";
import { apiClient } from "@/lib/axios/instance";
import { fetchBranchList } from "@/lib/api/branches";
import { branchtableListEndpoint, websiteleadCreateListEndpoint } from "@/pages/api/shipapi";

/**
 * @param {Object}  options
 * @param {string}  options.formType  Identifier sent to the server (e.g. "Branch Appointment" | "branch")
 * @param {Function} [options.onSuccess] Optional callback after successful submission
 */
export function useAppointmentForm({ formType = "Branch Appointment", onSuccess } = {}) {
  const [branchList, setBranchList] = useState([]);
  const [successMessage, setSuccessMessage] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [branchLoadError, setBranchLoadError] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: "",
      branch: "",
      mobile: "",
      formType,
      // Honeypot — must stay empty; bots tend to fill every field
      // _honeypot: "",
    },
  });

  // ---------------------------------------------------------------------------
  // Fetch branches on mount
  // ---------------------------------------------------------------------------
  // useEffect(() => {
  //   let isMounted = true;
  //   fetchBranchList()
  //     .then((list) => {
  //       if (isMounted) {
  //         setBranchList(list);
  //         if (list.length === 0) setBranchLoadError(true);
  //       }
  //     })
  //     .catch(() => {
  //       if (isMounted) setBranchLoadError(true);
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);


    useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(branchtableListEndpoint);
        if (res.ok) {
          const data = await res.json();
          setBranchList(data?.data?.list);
        } else {
          console.error("API responded with an error");
        }
      } catch (err) {
        console.error("Fetch Error!", err);
      }
    }
    fetchData();
  }, []);

  // ---------------------------------------------------------------------------
  // Form submission
  // ---------------------------------------------------------------------------
  // const handleFormSubmit = async (data) => {
  //   setSubmissionError("");

  //   // Bot detection: if honeypot is filled, silently appear to succeed
  //   if (data._honeypot) {
  //     setSuccessMessage(true);
  //     return;
  //   }

  //   try {
  //     await apiClient.post("/api/saveData", {
  //       name: data.name,
  //       mobile: data.mobile,
  //       branch: data.branch,
  //       formType,
  //     });

  //     // Success
  //     setSuccessMessage(true);
  //     reset({ name: "", branch: "", mobile: "", formType });

  //     if (onSuccess) onSuccess();
  //   } catch (err) {
  //     const responseData = err.response?.data;
  //     if (responseData && responseData.errors) {
  //       // Map server-side field errors back to the form
  //       Object.entries(responseData.errors).forEach(([field, msg]) => {
  //         setError(field, { type: "server", message: String(msg) });
  //       });
  //       setSubmissionError(responseData.message || "Please correct the highlighted fields.");
  //     } else {
  //       setSubmissionError(
  //         err.message || "Network error. Please check your connection and try again."
  //       );
  //     }
  //   }
  // };



    const handleFormSubmit = async (data) => {
    setSubmissionError("");

    try {
      // 1. Submit to local server API for storage and Sheets forwarding
      const saveResponse = await fetch("/api/saveData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          mobile: data.mobile,
          branch: data.branch,
          formType: "Branch Appointment",
        }),
      });

      const saveResult = await saveResponse.json();

      if (!saveResponse.ok) {
        // If server returns validation errors, map them using setError
        if (saveResult.errors) {
          Object.entries(saveResult.errors).forEach(([field, msg]) => {
            setError(field, { type: "server", message: msg });
          });
        } else {
          setSubmissionError(saveResult.message || "Validation failed");
        }
        return;
      }

      // 2. Submit to CRM
      const body = {
        name: data.name,
        branch: data.branch,
        mobile: data.mobile,
        source_type: "21",
        lead_type: "4",
      };

      const crmResponse = await fetch(websiteleadCreateListEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!crmResponse.ok) {
        console.error("CRM submission failed");
        setSubmissionError("Failed to submit to CRM. Please try again.");
        return;
      }

      // Show success popup and reset form
      setSuccessMessage(true);
      reset({
        name: "",
        branch: "",
        mobile: "",
        formType: "Branch Appointment",
      });

      if (onSubmit) {
        onSubmit();
      }
    } catch (error) {
      console.error(error);
      setSubmissionError("Network error. Please try again.");
    }
  };

  return {
    // React Hook Form
    register,
    handleSubmit,
    control,
    errors,
    isSubmitting,
    reset,
    // Derived state
    branchList,
    branchLoadError,
    successMessage,
    submissionError,
    setSuccessMessage,
    // Handler
    handleFormSubmit,
  };
}
