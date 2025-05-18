import { useParams } from "react-router-dom";
import { useExercisesStore } from "../context/ExercisesContext";
import { useTranslation } from "react-i18next";

const ExercisePage: React.FC = () => {
  const params = useParams<{ exerciseName: string }>();
  const { t } = useTranslation();
  const { exercises } = useExercisesStore();
  const exercise = exercises.find((e) => e.name === params.exerciseName);
  if (params.exerciseName === "all") {
    return (
      <div className="flex flex-col gap-2 px-2">
        <div>
          <h3 className="text-xl">{t("allExercises")}</h3>
        </div>
        {/* TODO: Insertar 2 gráficos de radar:
            * Gráfico 1:
                - Angle Axis: exercise.name
                - Radar datakey: 1RM más reciente de ese ejercicio.
            * Gráfico 2:
                - Eje X: exercise.name
                - Radar datakey: Volumen de Entrenamiento más reciente de ese ejercicio.

      */}

        {/* TODO: Agregar una lista de elementos que contengan el desempeño más reciente de cada ejercicio con su correspondiente:
            - Fecha
            - 1RM
            - Volumen de Entrenamiento
      */}
      </div>
    );
  }
  if (!exercise) {
    return (
      <p className="text-sm text-red-700">Error 404: {t("exerciseNotFound")}</p>
    );
  }
  return (
    <div className="flex flex-col gap-2 px-2">
      <div>
        <h3 className="text-xl">{exercise.name}</h3>
      </div>
      {/* TODO: Insertar 2 gráficos de línea (o hacerlo en un solo gráfico de doble Axis Y con opción de TOGGLE):
            * Gráfico 1:
                - Eje X: Fechas
                - Eje Y: 1RM (Kg)
            * Gráfico 2:
                - Eje X: Fechas
                - Eje Y: Volumen de Entrenamiento (Kg)

      */}

      {/* TODO: Agregar una lista de elementos que contengan:
            - Fecha
            - 1RM
            - Volumen de Entrenamiento
            Con la posibilidad de crear nuevos y editar/eliminar los creados, ordenados del más reciente al más antiguo.
      */}
    </div>
  );
};

export default ExercisePage;
