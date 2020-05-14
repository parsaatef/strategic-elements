import { addLocaleData } from 'react-intl';
import Enlang from './entries/en-US';
import FaLang from './entries/fa_IR';

const AppLocale = {
  en: Enlang,
  fa: FaLang
};

addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.fa.data);

export default AppLocale;
