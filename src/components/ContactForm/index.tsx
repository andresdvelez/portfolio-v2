"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { motion, AnimatePresence } from "framer-motion";
import { Input, Textarea, Select, SelectItem } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface ContactFormProps {
  onClose?: () => void;
}

// Esquema de validación Zod para el formulario del cliente
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre es demasiado largo"),
  email: z
    .string()
    .email("Email inválido")
    .min(5, "Email demasiado corto")
    .max(100, "Email demasiado largo"),
  company: z
    .string()
    .max(100, "El nombre de la compañía es demasiado largo")
    .optional(),
  interestedIn: z.string().optional(),
  message: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(2000, "El mensaje es demasiado largo"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

// Hook para detectar si es mobile/tablet
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

export function ContactForm({ onClose }: ContactFormProps) {
  const isMobile = useIsMobile();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [showThankYou, setShowThankYou] = useState(false);

  const captchaRef = useRef<HCaptcha>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [waitingForCaptcha, setWaitingForCaptcha] = useState(false);

  // React Hook Form setup con Zod
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    trigger,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      company: "",
      interestedIn: "",
      message: "",
    },
  });

  const submitFormRef = useRef<(() => void) | null>(null);

  const handleCaptchaVerify = useCallback((token: string) => {
    setCaptchaToken(token);
    if (waitingForCaptcha) {
      setWaitingForCaptcha(false);
      setIsSubmitting(false);
      setTimeout(() => {
        submitFormRef.current?.();
      }, 100);
    }
  }, [waitingForCaptcha]);

  const handleCaptchaExpire = useCallback(() => {
    setCaptchaToken(null);
  }, []);

  const onSubmit = useCallback(async (data: ContactFormData) => {
    setSubmitStatus({ type: null, message: "" });

    if (!captchaToken) {
      setWaitingForCaptcha(true);
      setIsSubmitting(true);
      setSubmitStatus({
        type: null,
        message: "Verificando seguridad...",
      });
      captchaRef.current?.execute();
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          captchaToken: captchaToken,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        if (responseData.errors) {
          setSubmitStatus({
            type: "error",
            message: responseData.errors.join(", "),
          });
        } else {
          throw new Error(responseData.message || "Error al enviar el mensaje");
        }
        setCaptchaToken(null);
        captchaRef.current?.resetCaptcha();
        setIsSubmitting(false);
        return;
      }

      // Mostrar Thank You
      setShowThankYou(true);
      reset();
      setCaptchaToken(null);
      captchaRef.current?.resetCaptcha();
      
      // Auto-cerrar después de 5 segundos
      setTimeout(() => {
        setShowThankYou(false);
        setSubmitStatus({ type: null, message: "" });
        onClose?.();
      }, 5000);
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Error al enviar el mensaje. Por favor, intenta de nuevo.",
      });
      setCaptchaToken(null);
      captchaRef.current?.resetCaptcha();
    } finally {
      setIsSubmitting(false);
    }
  }, [captchaToken, onClose, reset]);

  const handleClose = useCallback(() => {
    setShowThankYou(false);
    setSubmitStatus({ type: null, message: "" });
    onClose?.();
  }, [onClose]);

  // Guardar la referencia de submit para uso con captcha
  useEffect(() => {
    submitFormRef.current = () => {
      trigger().then((isValid) => {
        if (isValid) {
          handleSubmit(onSubmit)();
        }
      });
    };
  }, [handleSubmit, onSubmit, trigger]);

  // Si está mostrando Thank You
  if (showThankYou) {
    return (
      <motion.div
        initial={
          isMobile
            ? { y: "100%" }
            : { opacity: 0, scale: 0.95 }
        }
        animate={
          isMobile
            ? { y: 0 }
            : { opacity: 1, scale: 1 }
        }
        exit={
          isMobile
            ? { y: "100%" }
            : { opacity: 0, scale: 0.95 }
        }
        transition={
          isMobile
            ? { type: "spring", damping: 30, stiffness: 300 }
            : { duration: 0.2 }
        }
        className={`
          w-full shadow-2xl flex flex-col justify-between p-8 lg:p-12
          ${isMobile ? "fixed bottom-0 left-0 right-0 rounded-t-3xl min-h-[500px]" : "mx-auto rounded-3xl min-h-[600px]"}
        `}
        style={{
          ...((!isMobile) ? { width: "92%", maxWidth: "2000px" } : {}),
          background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 lg:top-8 lg:right-8 text-white/80 hover:text-white transition-colors z-10"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Thank You Content */}
        <div className="flex-1 flex flex-col justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-5xl lg:text-7xl font-bold text-white mb-4"
            style={{ lineHeight: "1.1" }}
          >
            Thank<br />You.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg lg:text-xl text-white/90 max-w-md"
          >
            We&apos;ll be in touch.<br />Shortly!
          </motion.p>
        </div>

        {/* Next Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          onClick={handleClose}
          className="self-end flex items-center gap-2 text-white/80 hover:text-white transition-all hover:gap-3 group"
        >
          <span className="text-sm font-medium tracking-widest uppercase">
            NEXT
          </span>
          <svg
            className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </motion.button>
      </motion.div>
    );
  }

  // Formulario de contacto
  return (
    <motion.div
      initial={
        isMobile
          ? { y: "100%" }
          : { opacity: 0, scale: 0.95 }
      }
      animate={
        isMobile
          ? { y: 0 }
          : { opacity: 1, scale: 1 }
      }
      exit={
        isMobile
          ? { y: "100%" }
          : { opacity: 0, scale: 0.95 }
      }
      transition={
        isMobile
          ? { type: "spring", damping: 30, stiffness: 300 }
          : { duration: 0.2 }
      }
      className={`
        w-full bg-white shadow-2xl
        ${isMobile ? "fixed bottom-0 left-0 right-0 rounded-t-3xl max-h-[90vh] overflow-y-auto" : "mx-auto rounded-3xl"}
      `}
      style={!isMobile ? { width: "92%", maxWidth: "2000px" } : {}}
    >
      {/* Header */}
      <div className={`relative ${isMobile ? "px-6 pt-6 pb-4" : "px-20 pt-10 pb-6"}`}>
        {/* Drag indicator para mobile */}
        {isMobile && (
          <div className="flex justify-center mb-4">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
          </div>
        )}
        
        <h2 className={`font-normal text-gray-900 ${isMobile ? "text-xl" : "text-2xl"}`}>
          Get in touch
        </h2>
        
        {onClose && (
          <button
            onClick={handleClose}
            className={`absolute text-gray-400 hover:text-gray-600 transition-colors ${
              isMobile ? "top-6 right-6" : "top-8 right-8"
            }`}
            aria-label="Close"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${isMobile ? "px-6 pb-6 space-y-4" : "px-20 pb-10 space-y-6"}`}
      >
        {/* First Row - Name & Email */}
        <div className={`${isMobile ? "space-y-4" : "grid grid-cols-2 gap-8"}`}>
          {/* Name Field */}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                label="Name"
                variant="underlined"
                isRequired
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message}
                classNames={{
                  label: "text-xs text-gray-500 font-normal",
                  input: [
                    "text-base",
                    "!text-gray-900",
                    "placeholder:text-gray-400",
                    "bg-transparent",
                  ],
                  inputWrapper: [
                    "border-gray-200",
                    "hover:border-gray-400",
                    "data-[hover=true]:border-gray-400",
                    "bg-transparent",
                  ],
                  errorMessage: "text-xs text-red-500 mt-1",
                }}
              />
            )}
          />

          {/* Email Field */}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                label="Email"
                variant="underlined"
                isRequired
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
                classNames={{
                  label: "text-xs text-gray-500 font-normal",
                  input: [
                    "text-base",
                    "!text-gray-900",
                    "placeholder:text-gray-400",
                    "bg-transparent",
                  ],
                  inputWrapper: [
                    "border-gray-200",
                    "hover:border-gray-400",
                    "data-[hover=true]:border-gray-400",
                    "bg-transparent",
                  ],
                  errorMessage: "text-xs text-red-500 mt-1",
                }}
              />
            )}
          />
        </div>

        {/* Second Row - Company & Interested In */}
        <div className={`${isMobile ? "space-y-4" : "grid grid-cols-2 gap-8"}`}>
          {/* Company Field */}
          <Controller
            name="company"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                label="Company"
                variant="underlined"
                isInvalid={!!errors.company}
                errorMessage={errors.company?.message}
                classNames={{
                  label: "text-xs text-gray-500 font-normal",
                  input: [
                    "text-base",
                    "!text-gray-900",
                    "placeholder:text-gray-400",
                    "bg-transparent",
                  ],
                  inputWrapper: [
                    "border-gray-200",
                    "hover:border-gray-400",
                    "data-[hover=true]:border-gray-400",
                    "bg-transparent",
                  ],
                  errorMessage: "text-xs text-red-500 mt-1",
                }}
              />
            )}
          />

          {/* Interested In Dropdown */}
          <Controller
            name="interestedIn"
            control={control}
            render={({ field: { onChange, value, ...field } }) => (
              <Select
                {...field}
                label="Interested in..."
                selectedKeys={value ? [value] : []}
                onSelectionChange={(keys) => {
                  const selectedValue = Array.from(keys)[0] as string;
                  onChange(selectedValue || "");
                }}
                variant="underlined"
                isInvalid={!!errors.interestedIn}
                errorMessage={errors.interestedIn?.message}
                classNames={{
                  label: "text-xs text-gray-500 font-normal",
                  value: "!text-base !text-gray-900",
                  trigger: [
                    "border-gray-200",
                    "hover:border-gray-400",
                    "data-[hover=true]:border-gray-400",
                    "bg-transparent",
                  ],
                  listboxWrapper: "bg-white",
                  listbox: "bg-white",
                  popoverContent: "bg-white",
                  errorMessage: "text-xs text-red-500 mt-1",
                }}
                listboxProps={{
                  itemClasses: {
                    base: [
                      "!text-gray-900",
                      "data-[hover=true]:!text-gray-900",
                      "data-[selectable=true]:focus:!text-gray-900",
                      "data-[pressed=true]:opacity-70",
                      "data-[hover=true]:bg-gray-100",
                      "data-[selectable=true]:focus:bg-gray-100",
                    ],
                  },
                }}
              >
                <SelectItem key="web-development">Web Development</SelectItem>
                <SelectItem key="mobile-app-development">Mobile App Development</SelectItem>
                <SelectItem key="ui-ux-design">UI/UX Design</SelectItem>
                <SelectItem key="rpa-automation">RPA - Robotic Process Automation</SelectItem>
                <SelectItem key="business-automation">Business Process Automation</SelectItem>
                <SelectItem key="marketing-automation">Marketing Automation</SelectItem>
                <SelectItem key="sales-automation">Sales Automation</SelectItem>
                <SelectItem key="cloud-solutions">Cloud Computing Solutions</SelectItem>
                <SelectItem key="ai-machine-learning">AI & Machine Learning</SelectItem>
                <SelectItem key="data-analytics">Big Data & Analytics</SelectItem>
                <SelectItem key="cybersecurity">Cybersecurity Solutions</SelectItem>
                <SelectItem key="iot-solutions">IoT Solutions</SelectItem>
                <SelectItem key="blockchain">Blockchain Development</SelectItem>
                <SelectItem key="erp-implementation">ERP Implementation</SelectItem>
                <SelectItem key="crm-solutions">CRM Solutions</SelectItem>
                <SelectItem key="devops-cicd">DevOps & CI/CD</SelectItem>
                <SelectItem key="api-integration">API Development & Integration</SelectItem>
                <SelectItem key="microservices">Microservices Architecture</SelectItem>
                <SelectItem key="ecommerce">E-commerce Solutions</SelectItem>
                <SelectItem key="fintech">FinTech Solutions</SelectItem>
                <SelectItem key="hr-automation">HR & Payroll Automation</SelectItem>
                <SelectItem key="document-management">Document Management Systems</SelectItem>
                <SelectItem key="workflow-automation">Workflow Automation</SelectItem>
                <SelectItem key="chatbot-development">Chatbot & Virtual Assistant</SelectItem>
                <SelectItem key="it-infrastructure">IT Infrastructure Management</SelectItem>
                <SelectItem key="digital-transformation">Digital Transformation Consulting</SelectItem>
                <SelectItem key="custom-software">Custom Software Development</SelectItem>
                <SelectItem key="maintenance-support">Maintenance & Support</SelectItem>
                <SelectItem key="other">Other</SelectItem>
              </Select>
            )}
          />
        </div>

        {/* Message Field */}
        <Controller
          name="message"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              label="Message"
              variant="underlined"
              isRequired
              minRows={3}
              isInvalid={!!errors.message}
              errorMessage={errors.message?.message}
              classNames={{
                label: "text-xs text-gray-500 font-normal",
                input: [
                  "text-base",
                  "!text-gray-900",
                  "placeholder:text-gray-400",
                  "bg-transparent",
                ],
                inputWrapper: [
                  "border-gray-200",
                  "hover:border-gray-400",
                  "data-[hover=true]:border-gray-400",
                  "bg-transparent",
                ],
                errorMessage: "text-xs text-red-500 mt-1",
              }}
            />
          )}
        />

        {/* hCaptcha invisible */}
        <HCaptcha
          ref={captchaRef}
          sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || ""}
          size="invisible"
          onVerify={handleCaptchaVerify}
          onExpire={handleCaptchaExpire}
        />

        {/* Status Messages */}
        <AnimatePresence>
          {submitStatus.message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`text-sm ${
                submitStatus.type === "success"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {submitStatus.message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <div className="flex justify-center items-center pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative flex items-center gap-4 pl-8 pr-2 py-2 bg-white border border-gray-200 rounded-full hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg"
          >
            <span className="text-base font-medium text-gray-900 tracking-wide">
              Submit
            </span>
            <div className="relative">
              {/* Ripple effect on hover */}
              <div className="absolute inset-0 rounded-full bg-gray-400 opacity-0 group-hover:opacity-20 group-hover:animate-ping"></div>
              
              <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-active:scale-95 relative overflow-hidden">
                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                
                {isSubmitting ? (
                  <svg
                    className="animate-spin h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 text-white transform group-hover:scale-110 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </div>
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center pt-1">
          Protected by hCaptcha ·{" "}
          <a
            href="https://www.hcaptcha.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600 transition-colors"
          >
            Privacy
          </a>{" "}
          ·{" "}
          <a
            href="https://www.hcaptcha.com/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600 transition-colors"
          >
            Terms
          </a>
        </p>
      </form>
    </motion.div>
  );
}
