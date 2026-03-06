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

const VerifyEmailForm = ({ email }) => {
  const router = useRouter();
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const onSubmit = async (data) => {
    try {
      const response = await api.post("verify-email-code", {
        email: email,
        code: data.code,
      });
      toast.success(response.data.message || "Email verified successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.code?.[0] ||
        "Verification failed. Please check the code and try again.";
      toast.error(errorMessage);
    }
  };

  const handleResend = async () => {
    if (timer > 0 || resending) return;
    setResending(true);
    try {
      const response = await api.post("resend-verification-code", { email });
      toast.success(response.data.message || "Verification code resent!");
      setTimer(60); // Wait 1 minute before resending again
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to resend code.");
    } finally {
      setResending(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-12">
            <div className="postbox__comment-input mb-30">
              <input
                name="code"
                {...register("code")}
                className="inputText"
                placeholder="6-digit code"
              />
              <span className="floating-label">Verification Code</span>
              <p className="form_error">{errors.code?.message}</p>
            </div>
          </div>
        </div>

        <div className="signin-banner-from-btn mb-20">
          <button type="submit" className="signin-btn w-100">
            Verify Email
          </button>
        </div>

        <div className="text-center mt-3">
          <p>
            Didn't receive the code?{" "}
            <button
              type="button"
              className="btn btn-link p-0"
              onClick={handleResend}
              disabled={timer > 0 || resending}
              style={{ verticalAlign: "baseline" }}
            >
              {timer > 0 ? `Resend in ${timer}s` : "Resend Code"}
            </button>
          </p>
        </div>
      </form>
    </>
  );
};

export default VerifyEmailForm;
