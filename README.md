<h1 align="center">
  Cartão Med Mineiro
</h1>

<!-- Screenshots section -->
<!-- <p align="center">
  <img alt="Cartão Med Mineiro Demo" src=".github/demo.gif" width="100%">
</p> -->

## Sobre o Projeto

Aplicativo mobile do Cartão Med Mineiro, uma plataforma de saúde que oferece serviços médicos, parcerias com estabelecimentos e benefícios para assinantes. O app permite autenticação de titular e dependente, exibição de carteirinha digital, solicitação de atendimentos médicos via integração com o sistema Rapidoc, gerenciamento de faturas através do gateway Asaas, e acesso a fornecedores de gás com sistema de guias de desconto.

---

## Funcionalidades

- **Autenticação** - Login com CPF e data de nascimento para titular e dependentes
- **Carteirinha Digital** - Visualização da carteirinha virtual do plano de saúde
- **Atendimento Médico** - Solicitação de atendimento via integração com Rapidoc
- **Gestão de Faturas** - Consulta e emissão de segunda via através do Asaas
- **Parceiros** - Listagem de estabelecimentos parceiros com benefícios
- **Fornecedores de Gás** - Listagem de fornecedores cadastrados
- **Guias de Desconto** - Solicitação e gerenciamento de guias para desconto em gás
- **Controle de Assinatura** - Validação e bloqueio de funcionalidades conforme status da assinatura

---

## Tecnologias

### Mobile
- **[React Native](https://reactnative.dev/)** - Framework para desenvolvimento mobile multiplataforma
- **[Expo](https://expo.dev/)** - Plataforma para desenvolvimento e build de apps React Native
- **[Expo Router](https://docs.expo.dev/router/introduction/)** - Sistema de roteamento file-based para navegação
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática

### UI/UX
- **[NativeWind](https://www.nativewind.dev/)** - Tailwind CSS para React Native
- **[Lucide React Native](https://lucide.dev/)** - Biblioteca de ícones
- **[React Native Animatable](https://github.com/oblador/react-native-animatable)** - Animações declarativas
- **[Expo Linear Gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/)** - Gradientes lineares

### Gerenciamento de Estado & Forms
- **[React Hook Form](https://react-hook-form.com/)** - Gerenciamento de formulários performático
- **[AsyncStorage](https://react-native-async-storage.github.io/async-storage/)** - Persistência local de dados
- **[React Navigation](https://reactnavigation.org/)** - Navegação com drawer lateral

### Integrações
- **[Axios](https://axios-http.com/)** - Cliente HTTP para requisições à API
- **[React Native Toast Message](https://github.com/calintamas/react-native-toast-message)** - Notificações toast

### DevOps & Qualidade
- **[EAS Build](https://docs.expo.dev/build/introduction/)** - Sistema de build para iOS e Android
- **[Husky](https://typicode.github.io/husky/)** - Git hooks para automação
- **[ESLint](https://eslint.org/)** - Linter para padronização de código
- **[Prettier](https://prettier.io/)** - Formatador de código

---

## Estrutura do Projeto

```
cartao-med-mineiro-app/
├── src/
│   ├── app/
│   │   ├── (app)/
│   │   │   ├── guide-gas/
│   │   │   ├── card-identity.tsx
│   │   │   ├── club.tsx
│   │   │   ├── index.tsx
│   │   │   ├── partner.tsx
│   │   │   ├── payments.tsx
│   │   │   └── supplier-gas.tsx
│   │   ├── _layout.tsx
│   │   └── login.tsx
│   ├── assets/
│   │   ├── fonts/
│   │   └── images/
│   ├── components/
│   │   ├── drawer/
│   │   └── ui/
│   ├── contexts/
│   │   └── auth.tsx
│   ├── lib/
│   ├── services/
│   │   └── api.ts
│   ├── types/
│   └── utils/
├── app.json
├── package.json
└── tailwind.config.js
```

---

## English Version

### About

Mobile application for Cartão Med Mineiro, a healthcare platform offering medical services, partner benefits, and subscription management. The app features authentication for holders and dependents, digital ID card display, medical appointment requests via Rapidoc integration, invoice management through Asaas gateway, and gas supplier access with discount voucher system.

### Features

- **Authentication** - Login with CPF and birthdate for holders and dependents
- **Digital ID Card** - Virtual health plan card display
- **Medical Appointments** - Request appointments via Rapidoc integration
- **Invoice Management** - Query and duplicate invoices through Asaas
- **Partner Network** - Browse partner establishments with benefits
- **Gas Suppliers** - Registered gas supplier listings
- **Discount Vouchers** - Request and manage gas discount vouchers
- **Subscription Control** - Feature validation and blocking based on subscription status

### Tech Stack

**Mobile:** React Native, Expo, Expo Router, TypeScript

**UI/UX:** NativeWind (Tailwind CSS), Lucide Icons, React Native Animatable, Expo Linear Gradient

**State & Forms:** React Hook Form, AsyncStorage, React Navigation

**Integrations:** Axios, React Native Toast Message

**DevOps:** EAS Build, Husky, ESLint, Prettier
