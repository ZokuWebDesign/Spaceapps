"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

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

// Form validation schema
const contactSchema = z.object({
  whatsapp: z
    .string()
    .min(1, "WhatsApp é obrigatório")
    .refine((value) => {
      const digitsOnly = value.replace(/\D/g, '');
      return digitsOnly.length >= 10; // At least 10 digits for a valid phone
    }, "Número de WhatsApp deve ter pelo menos 10 dígitos")
    .refine((value) => {
      const digitsOnly = value.replace(/\D/g, '');
      return digitsOnly.length <= 15; // Max 15 digits (international standard)
    }, "Número muito longo"),
  preferredTime: z
    .string()
    .min(1, "Horário preferido é obrigatório")
    .max(10, "Horário muito longo"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
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
    
    try {
      // Use environment variable for API URL, fallback to relative path for development
      const apiUrl = process.env.NEXT_PUBLIC_API_URL 
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/contact`
        : '/api/contact';
        
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Sucesso! 🎉",
          description: result.message,
        });
        resetForm(); // Clear form and state
      } else {
        toast({
          title: "Erro",
          description: result.error || "Erro ao enviar formulário",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro de conexão. Verifique sua internet e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="flex flex-col items-center max-w-7xl mx-auto px-14 pt-[100px] pb-[50px]">

        {/* Main content container with gradient background and border */}
        <div 
          className="flex flex-col-reverse justify-start items-center gap-8 relative w-[998px] h-[560px] px-[80px] py-[28px] rounded-[6px] bg-gradient-to-br from-white/10 to-gray-500/20 border border-tertiary backdrop-blur-sm overflow-visible"
        >
          {/* Header Section */}
          <div className="text-center mb-12">
            {/* Logo */}
            <div className="flex justify-center -mb-6">
              <img 
                src="/assets/logo/logo-big.svg" 
                alt="Space Logo"
                className="w-[390px] h-[390px] object-contain"
              />
            </div>

            {/* Title and Description */}
            <div className="flex flex-col gap-4 mb-8">
              <h1 className="text-white text-[56px] font-normal leading-[68px] tracking-[2.8px]">
                Deixe seu Whatsapp
              </h1>
              <p className="text-white text-[20px] font-medium leading-[24px] tracking-[1.6px]">
                Não pode falar agora mas quer lembrar de tirar a sua ideia do papel? Deixe o seu Whatsapp e o melhor horário para o nosso time comercial entrar em contato!
              </p>
              <div className="text-white/70 text-[14px] font-normal">
                💡 <strong>Formatos aceitos:</strong> +55 (11) 99999-9999, +1 555-123-4567, (11) 99999-9999
              </div>
            </div>

            {/* Form Row */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4 items-end">
              {/* WhatsApp Input */}
              <div className="flex-1">
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
                    placeholder="+55 (11) 99999-9999"
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
                    placeholder="Ex.: 17h"
                    className="w-full bg-transparent text-white text-[20px] placeholder-white outline-none"
                    disabled={isSubmitting}
                  />
                </div>
                {errors.preferredTime && (
                  <p className="text-red-400 text-sm mt-1 px-1">{errors.preferredTime.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                size="lg" 
                disabled={isSubmitting}
                className="min-w-[120px]"
              >
                {isSubmitting ? "ENVIANDO..." : "ENVIAR"}
              </Button>
            </form>
          </div>
        </div>
    </section>
  );
};

export default Contact;
