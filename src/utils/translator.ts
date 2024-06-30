type Translator = Record<string, string>;

const translatorHandler: ProxyHandler<Translator> = {
  get: function (target, prop) {
    if (typeof prop === "string") {
      const propName = prop.toLowerCase();
      return target[propName] || target[prop] || prop;
    }
    return prop;
  },
};

export const translator: Translator = new Proxy<Translator>(
  {
    index: "Inicio",
    "card-identity": "Carteirinha",
    club: "Clube de benefícios",
    partner: "Parceiros",
    payments: "Faturas",
    "supplier-gas": "Fornecedores de gás",
    "guide-gas/index": "Pedidos de gás",
  },
  translatorHandler,
);
