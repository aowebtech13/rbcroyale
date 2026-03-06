import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import api from "../utils/api";
import { toast } from "react-toastify";

const schema = yup
  .object({
    code: yup.string().required().length(6).label("Verification Code"),
  })
  .required();

const VerificationForm = ({ email, onSuccess }) => {
  const router = useRouter();
  const [resendTimer, setResendTimer] = useState(0);
  const [isResending, setIsResending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const onSubmit = async (data) => {
    try {
      const response = await api.post("verify-email-code", {
        email,
        code: data.code,
      });
      toast.success(response.data.message || "Email verified successfully!");
      if (onSuccess) {
        onSuccess(response.data);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.code?.[0] ||
        "Verification failed. Please check the code.";
      toast.error(errorMessage);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0 || isResending) return;

    setIsResending(true);
    try {
      const response = await api.post("resend-verification-code", { email });
      toast.success(response.data.message || "Verification code resent!");
      setResendTimer(60);
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || "Failed to resend code.";
      toast.error(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-12">
            <p className="mb-20 text-center">
              A 6-digit verification code has been sent to <strong>{email}</strong>.
              Please enter it below to verify your account.
            </p>
            <div className="postbox__comment-input mb-30">
              <input
                name="code"
                {...register("code")}
                className="inputText"
                placeholder="Enter 6-digit code"
                maxLength={6}
              />
              <span className="floating-label">Verification Code</span>
              <p className="form_error">{errors.code?.message}</p>
            </div>
          </div>
        </div>

        <div className="signin-banner-from-btn mb-20">
          <button type="submit" className="signin-btn w-100">
            Verify Account
          </button>
        </div>

        <div className="signin-banner-from-register mt-10 text-center">
          <span>
            Didn't receive the code?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={resendTimer > 0 || isResending}
              style={{
                border: "none",
                background: "none",
                color: resendTimer > 0 ? "#ccc" : "#007bff",
                cursor: resendTimer > 0 ? "not-allowed" : "pointer",
                padding: 0,
                textDecoration: "underline",
              }}
            >
              {resendTimer > 0
                ? `Resend in ${resendTimer}s`
                : isResending
                ? "Resending..."
                : "Resend Code"}
            </button>
          </span>
        </div>
      </form>
    </>
  );
};

export default VerificationForm;
