import i18n from "../../lang"; // 放第一位!!!
import { type UserModule } from '~/types';
export const install: UserModule = ({ app, router }) => {
  app.use(i18n, router);
};
export const step = 2; 