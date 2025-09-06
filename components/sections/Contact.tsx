"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from '@/hooks/useTranslations';

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
      .max(10, t.contact.form.validation.timeMaxLength),
  });

  type ContactFormData = z.infer<typeof contactSchema>;

  const [isSubmitting, setIsSubmitting] = useState(false);
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
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // Immediate feedback toast while request is in-flight
    const submittingToast = toast({
      title: t.contact.form.submittingButton,
      description: (t as any)?.contact?.form?.sendingMessage || 'Enviando suas informações...'
    });
    try {
      // Use production API URL, fallback to local server for development
      const apiUrl = process.env.NEXT_PUBLIC_API_URL 
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/contact`
        : 'https://api-site-space.onrender.com/api/contact';
        
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        submittingToast.dismiss();
        toast({
          title: t.contact.form.success.title,
          description: result.message || t.contact.form.success.message,
        });
        resetForm(); // Clear form and state
      } else {
        submittingToast.dismiss();
        toast({
          title: t.contact.form.error.title,
          description: result.error || t.contact.form.error.genericMessage,
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
    <section className="flex flex-col items-center max-w-7xl mx-auto px-4 lg:px-14 pt-[100px] pb-[50px]">

        {/* Main content container with gradient background and border */}
        <div 
          className="flex flex-col-reverse justify-start items-center gap-8 relative max-w-[998px] h-[580px] lg:h-[560px] px-4 lg:px-[80px] py-[28px] rounded-[6px] bg-gradient-to-br from-white/10 to-gray-500/20 border border-tertiary backdrop-blur-sm overflow-visible"
        >
          {/* Header Section */}
          <div className="text-center">
            {/* Logo */}
            <div className="flex justify-center -mb-6">
              <img 
                src="/assets/logo/logo-big.svg" 
                alt="Space Logo"
                className="w-[224px] lg:w-[390px] h-[224px] lg:h-[390px] object-contain"
              />
            </div>

            {/* Title and Description */}
            <div className="flex flex-col max-w-[720px] gap-2 lg:gap-4 mb-8">
              <h1 className="text-white lg:leading-[68px]">
                {t.contact.title}
              </h1>
              <p 
                className="text-white font-medium tracking-widest"
                dangerouslySetInnerHTML={{ __html: t.contact.description }}
              />
            </div>

            {/* Form Row */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4 items-end">
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
                  <p className="text-red-400 text-sm mt-1 px-1">{errors.whatsapp.message}</p>
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
                  <p className="text-red-400 text-sm mt-1 px-1">{errors.preferredTime.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="w-full md:w-[245px]">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t.contact.form.submittingButton : t.contact.form.submitButton}
                </Button>
              </div>
            </form>
          </div>
        </div>
    </section>
  );
};

export default Contact;
