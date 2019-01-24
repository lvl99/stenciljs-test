import i18next from "i18next/dist/commonjs";

export default class I18nextService {
  private initPromise: Promise<i18next.TranslationFunction>;
  private trans: Function = key => key;

  constructor(options: i18next.InitOptions) {
    this.initPromise = i18next.init(options).then(t => {
      console.log("i18next initialised", { result: this.initPromise, t });
      this.trans = t;
      return t;
    });
  }

  ready(): Promise<i18next.TranslationFunction> {
    return this.initPromise;
  }

  changeLanguage(newLanguage: string): Promise<i18next.TranslationFunction> {
    return i18next.changeLanguage(newLanguage).then(t => {
      console.log(`changed language to ${newLanguage}`);
      this.trans = t;
      return t;
    });
  }

  t(key: string | string[], options?: i18next.TranslationOptions<object>): any {
    console.log(`translate ${key}`);
    return this.trans(key, options);
  }
}
