"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from '@/hooks/useTranslations';
import { Loader2, CheckCircle2 } from "lucide-react";

// Helper function to format WhatsApp number
const formatWhatsApp = (value: string) => {
  // Remove all non-digit characters
  const digitsOnly = value.replace(/\D/g, '');
  
  // Handle different country codes
  let formatted = '';
  
  if (digitsOnly.length === 0) return '';
  
  // If starts with country code (55 for Brazil)
  if (digitsOnly.startsWith('55') && digitsOnly.length > 2) {
    const countryCode = digitsOnly.slice(0, 2);
    const phoneNumber = digitsOnly.slice(2);
    
    if (phoneNumber.length <= 2) {
      formatted = `+${countryCode} ${phoneNumber}`;
    } else if (phoneNumber.length <= 4) {
      formatted = `+${countryCode} (${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
    } else if (phoneNumber.length <= 9) {
      formatted = `+${countryCode} (${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7)}`;
    } else {
      formatted = `+${countryCode} (${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7, 11)}`;
    }
  }
  // If starts with other country codes (1 for US, 44 for UK, etc.)
  else if ((digitsOnly.startsWith('1') || digitsOnly.startsWith('44') || digitsOnly.startsWith('49')) && digitsOnly.length > 1) {
    const countryCodeLength = digitsOnly.startsWith('1') ? 1 : 2;
    const countryCode = digitsOnly.slice(0, countryCodeLength);
    const phoneNumber = digitsOnly.slice(countryCodeLength);
    
    if (phoneNumber.length <= 3) {
      formatted = `+${countryCode} ${phoneNumber}`;
    } else if (phoneNumber.length <= 6) {
      formatted = `+${countryCode} ${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    } else {
      formatted = `+${countryCode} ${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    }
  }
  // Default Brazilian format (assume no country code)
  else {
    if (digitsOnly.length <= 2) {
      formatted = digitsOnly;
    } else if (digitsOnly.length <= 6) {
      formatted = `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2)}`;
    } else if (digitsOnly.length <= 10) {
      formatted = `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2, 6)}-${digitsOnly.slice(6)}`;
    } else {
      formatted = `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2, 7)}-${digitsOnly.slice(7, 11)}`;
    }
  }
  
  return formatted;
};

const Contact = () => {
  const t = useTranslations();
  
  // Form validation schema
  const contactSchema = z.object({
    whatsapp: z
      .string()
      .min(1, t.contact.form.validation.whatsappRequired)
      .refine((value) => {
        const digitsOnly = value.replace(/\D/g, '');
        return digitsOnly.length >= 10; // At least 10 digits for a valid phone
      }, t.contact.form.validation.whatsappMinLength)
      .refine((value) => {
        const digitsOnly = value.replace(/\D/g, '');
        return digitsOnly.length <= 15; // Max 15 digits (international standard)
      }, t.contact.form.validation.whatsappMaxLength),
    preferredTime: z
      .string()
      .min(1, t.contact.form.validation.timeRequired)
      .max(50, t.contact.form.validation.timeMaxLength),
  });

  type ContactFormData = z.infer<typeof contactSchema>;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [whatsappValue, setWhatsappValue] = useState("");
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  // Handle WhatsApp input formatting
  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWhatsApp(e.target.value);
    setWhatsappValue(formatted);
    setValue("whatsapp", formatted, { shouldValidate: true });
  };

  // Reset form and state
  const resetForm = () => {
    reset();
    setWhatsappValue("");
    setHoneypot("");
  };

  const onSubmit = async (data: ContactFormData) => {
    // Bot mitigation via honeypot
    if (honeypot) {
      setIsSubmitted(true);
      return;
    }

    setIsSubmitting(true);
    // Immediate feedback toast while request is in-flight
    const submittingToast = toast({
      title: t.contact.form.submittingButton,
      description: t.contact.form.sendingMessage || 'Enviando suas informações...'
    });

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL ||
        (process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api/contact` : 'https://n8n.psiativa.com.br/webhook/spaceapps-lead');
        
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          whatsapp: data.whatsapp,
          preferredTime: data.preferredTime,
          source: 'spaceapps.com.br',
          page: typeof window !== 'undefined' ? window.location.pathname : '/'
        }),
      });

      const result = await response.json().catch(() => ({}));

      submittingToast.dismiss();

      if (response.ok && result.success !== false) {
        setIsSubmitted(true);
        toast({
          title: t.contact.form.success.title,
          description: t.contact.form.success.message,
        });
        resetForm();
      } else {
        toast({
          title: t.contact.form.error.title,
          description: result.error || result.message || t.contact.form.error.genericMessage,
          variant: "destructive",
        });
      }
    } catch (error) {
      submittingToast.dismiss();
      toast({
        title: t.contact.form.error.title,
        description: t.contact.form.error.connectionMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="flex flex-col items-center max-w-7xl mx-auto px-4 lg:px-14 pt-[100px] pb-[50px] scroll-mt-20">

        {/* Main content container with gradient background and border */}
        <div 
          className="flex flex-col-reverse justify-start items-center gap-8 relative max-w-[998px] min-h-[580px] lg:min-h-[560px] h-auto px-4 lg:px-[80px] py-[28px] rounded-[6px] bg-gradient-to-br from-white/10 to-gray-500/20 border border-tertiary backdrop-blur-sm overflow-visible"
        >
          {/* Header Section */}
          <div className="text-center w-full">
            {/* Logo */}
            <div className="flex justify-center -mb-6">
              <img 
                src="/assets/logo/logo-big.svg" 
                alt="Space Logo"
                className="w-[224px] lg:w-[390px] h-[224px] lg:h-[390px] object-contain"
              />
            </div>

            {/* Title and Description */}
            <div className="flex flex-col max-w-[720px] mx-auto gap-2 lg:gap-4 mb-8">
              <h1 className="text-white lg:leading-[68px]">
                {t.contact.title}
              </h1>
              <p 
                className="text-white font-medium tracking-widest"
                dangerouslySetInnerHTML={{ __html: t.contact.description }}
              />
            </div>

            {/* Form Row or Success State */}
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center p-6 sm:p-8 bg-white/5 border border-[#f63e84]/40 rounded-[12px] max-w-lg mx-auto backdrop-blur-md animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mb-4 text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.35)]">
                  <CheckCircle2 className="w-9 h-9 text-emerald-400" />
                </div>
                <h3 className="text-white text-2xl font-bold mb-2">
                  {t.contact.form.success.title}
                </h3>
                <p className="text-gray-200 text-sm sm:text-base max-w-md mx-auto mb-6 text-center leading-relaxed">
                  {t.contact.form.success.description}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsSubmitted(false);
                    resetForm();
                  }}
                  className="border-[#f63e84] text-white hover:bg-[#f63e84]/20 hover:text-white text-sm font-semibold tracking-wider h-[46px] px-6"
                >
                  {t.contact.form.success.sendAnother}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4 items-end max-w-[850px] mx-auto">
                {/* Honeypot field for bot mitigation */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="opacity-0 absolute -z-10 w-0 h-0 pointer-events-none"
                  aria-hidden="true"
                />

                {/* WhatsApp Input */}
                <div className="flex-1 w-full">
                  <div 
                    className={`h-[64px] rounded-[6px] px-3 flex items-center border ${
                      errors.whatsapp ? 'border-red-500' : 'border-[#f63e84]'
                    }`}
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(143, 143, 143, 0.21) 100%)'
                    }}
                  >
                    <input
                      {...register("whatsapp")}
                      type="tel"
                      placeholder={t.contact.form.whatsappPlaceholder}
                      value={whatsappValue}
                      onChange={handleWhatsAppChange}
                      className="w-full bg-transparent text-white text-[20px] placeholder-white outline-none"
                      disabled={isSubmitting}
                      maxLength={20}
                    />
                  </div>
                  {errors.whatsapp && (
                    <p className="text-red-400 text-sm mt-1 px-1 text-left">{errors.whatsapp.message}</p>
                  )}
                </div>

                {/* Time Input */}
                <div className="w-full md:w-[200px]">
                  <div 
                    className={`h-[64px] rounded-[6px] px-3 flex items-center border ${
                      errors.preferredTime ? 'border-red-500' : 'border-[#f63e84]'
                    }`}
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(143, 143, 143, 0.21) 100%)'
                    }}
                  >
                    <input
                      {...register("preferredTime")}
                      type="text"
                      placeholder={t.contact.form.timePlaceholder}
                      className="w-full bg-transparent text-white text-[20px] placeholder-white outline-none"
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.preferredTime && (
                    <p className="text-red-400 text-sm mt-1 px-1 text-left">{errors.preferredTime.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="w-full md:w-[245px]">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full flex items-center justify-center gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>{t.contact.form.submittingButton}</span>
                      </>
                    ) : (
                      <span>{t.contact.form.submitButton}</span>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
    </section>
  );
};

export default Contact;
