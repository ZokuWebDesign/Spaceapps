import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import allprice from "@/assets/illustrations/allprice.svg";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <section
      id="404"
      className="relative min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(#)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="text-center">
        <h1>404</h1>
        <h2>Página não encontrada!</h2>
        <p>Volte para a página inicial para continuar navegando pelo site.</p>
        <div className="relative">
            <div className="py-0 lg:py-10 relative z-10">
              <img
                src={allprice}
                alt="Ilustração de atendimento psicológico"
                className="w-full h-full object-cover"
              />
            </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-center w-full gap-4">
          <Button size="lg" className="flex w-full sm:w-[20.25rem] p-0 justify-center items-center rounded-2xl border border-white bg-primary hover:bg-primary/90 h-auto">
            <a
              href="/"
              className="w-full px-6 py-3.5 text-white text-xl font-semibold"
            >
              Voltar para página inicial
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
