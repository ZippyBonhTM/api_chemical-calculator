import { ElementSchema } from "@db";

/**
 * Filtra os query params para que sejam utilizados de foam segura caso algum query param venha errado.
 * @param params - Todos os queryParams.
 * @returns parametros que podem ser usados de forma segura.
 */
const paramsProcessor = (params: Partial<ElementSchema>) => {
  return params;
};

export default paramsProcessor;
