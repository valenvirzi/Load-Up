import gym from "../assets/gym.svg";
import { useTranslation } from "react-i18next";

const WelcomePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <main className="flex flex-col items-stretch gap-2 p-2 px-4">
      <div className="p-2">
        <img src={gym} className="w-24" alt="Icon" />
        <h2 className="text-3xl text-pretty">{t("welcomeToLoadUp")}</h2>
      </div>
      <section className="flex flex-col gap-3 p-2">
        {/* TODO: Translate Page */}
        <h2 className="text-xl">Funcionalidades:</h2>
        <ul className="flex list-disc flex-col gap-2 pr-1 pl-4 text-pretty">
          <li>
            <p>Guardar un inventario de tus Barras y Discos.</p>
          </li>
          <li>
            <p>
              Calcular la forma más eficiente de cargar tu barra a la hora de
              ejercitar.
            </p>
          </li>
          <li>
            <p>Guardar los ejercicios de tu rutina.</p>
          </li>
          <li>
            <p>
              Obtener la información de tu progreso, de forma gráfica, en cada
              ejercicio a lo largo del tiempo.
            </p>
          </li>
          <li>
            <p>
              Acceso a configuraciones en cuanto a: Unidad de peso, Idioma y
              Tema de la App
            </p>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default WelcomePage;
