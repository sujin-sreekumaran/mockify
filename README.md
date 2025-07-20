# 💬 Mockify

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-14.2.15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-11.0-FF0055?style=for-the-badge&logo=framer" alt="Framer Motion" />
</div>

<div align="center">
  <h3>🚀 Create Stunning, Authentic-Looking Direct Message Screenshots</h3>
  <p>A professional-grade social media DM screenshot generator supporting 6 major platforms with pixel-perfect accuracy and beautiful animations.</p>
</div>

---

## ✨ Features

### � **MultiD-Platform Support**

- **Instagram** - Direct Messages with story rings and verified badges
- **Twitter/X** - DMs with encryption indicators and modern UI
- **WhatsApp** - Chat interface with delivery status and background patterns
- **Facebook Messenger** - Professional messaging with active status
- **Tinder** - Match conversations with gradient styling
- **LinkedIn** - Professional messaging with connection status

### 🎨 **Customization Options**

- **Profile Images** - Upload custom profile pictures for both users
- **Contact Names** - Set custom usernames and display names
- **Messages** - Add unlimited messages with sender selection
- **Timestamps** - Automatic timestamp generation with 12/24h format support
- **Real-time Preview** - Live preview that updates as you type

### 📱 **Authentic Design**

- **Pixel-Perfect UI** - Meticulously crafted to match real platform interfaces
- **Brand Colors** - Official color schemes and gradients for each platform
- **Typography** - Platform-specific fonts and text styling
- **Animations** - Smooth, professional animations using Framer Motion
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile

### 🔧 **Developer Features**

- **TypeScript** - Full type safety and IntelliSense support
- **Component Architecture** - Modular, reusable component system
- **Theme Support** - Built-in light/dark mode compatibility
- **Extensible** - Easy to add new platforms and features
- **Performance Optimized** - Fast loading and smooth interactions

---

## 🖼️ Screenshots

<div align="center">
  <img src="./docs/screenshots/mockify-hero.png" alt="Mockify Hero" width="800" />
  <p><em>Main interface with Instagram preview</em></p>
</div>

<div align="center">
  <img src="./docs/screenshots/platform-selection.png" alt="Platform Selection" width="400" />
  <img src="./docs/screenshots/chat-editor.png" alt="Chat Editor" width="400" />
  <p><em>Platform selection and chat customization</em></p>
</div>

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/sujin-sreekumaran/mockify.git

# Navigate to project directory
cd mockify

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

---

## 🛠️ Tech Stack

### **Frontend Framework**

- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://reactjs.org/)** - UI library with latest features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript

### **Styling & UI**

- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready motion library
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icons

### **Development Tools**

- **[ESLint](https://eslint.org/)** - Code linting and formatting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[PostCSS](https://postcss.org/)** - CSS processing

---

## 📁 Project Structure

```
mockify/
├── src/
│   ├── app/                    # Next.js App Router pages
│   ├── components/
│   │   ├── forms/             # Form components (ChatEditor, etc.)
│   │   ├── layout/            # Layout components (Header, Sidebar)
│   │   ├── platform-previews/ # Platform-specific preview components
│   │   └── ui/                # Reusable UI components
│   ├── contexts/              # React contexts (Theme, etc.)
│   ├── lib/
│   │   ├── platforms/         # Platform configurations
│   │   └── utils/             # Utility functions
│   └── types/                 # TypeScript type definitions
├── public/                    # Static assets
├── docs/                      # Documentation and screenshots
└── ...config files
```

---

## 🎯 Usage

### 1. **Select Platform**

Choose from 6 supported platforms: Instagram, Twitter, WhatsApp, Facebook, Tinder, or LinkedIn.

### 2. **Customize Chat**

- Add contact name and profile images
- Create messages with sender selection
- Messages automatically get timestamps

### 3. **Generate Screenshot**

Click "Generate Screenshot" to create a high-quality PNG image of your chat.

### 4. **Download & Share**

Download the generated screenshot and use it for:

- UI/UX mockups and presentations
- Social media content creation
- Educational materials
- Design portfolios

---

## 🔧 Configuration

### Adding New Platforms

1. **Create Platform Configuration**

```typescript
// src/lib/platforms/newplatform.ts
export const newPlatformConfig: NewPlatformConfig = {
  id: "newplatform",
  name: "newplatform",
  displayName: "New Platform",
  colors: {
    /* platform colors */
  },
  typography: {
    /* typography settings */
  },
  layout: {
    /* layout configuration */
  },
  features: {
    /* platform-specific features */
  },
};
```

2. **Create Preview Component**

```typescript
// src/components/platform-previews/NewPlatformPreview.tsx
export const NewPlatformPreview: React.FC<NewPlatformPreviewProps> = ({
  chatData,
  config,
  theme,
  className,
}) => {
  // Component implementation
};
```

3. **Update Type Definitions**

```typescript
// src/types/index.ts
export type PlatformId =
  | "instagram"
  | "twitter"
  | "whatsapp"
  | "facebook"
  | "tinder"
  | "linkedin"
  | "newplatform";
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow the existing component patterns
- Add proper type definitions
- Include JSDoc comments for complex functions
- Use Tailwind CSS for styling
- Follow the established naming conventions

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Platform Design Teams** - For creating the beautiful interfaces we replicate
- **Open Source Community** - For the amazing tools and libraries
- **Contributors** - Everyone who helps improve Mockify

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/sujin-sreekumaran/mockify/issues)
- **Discussions**: [GitHub Discussions](https://github.com/sujin-sreekumaran/mockify/discussions)
- **Email**: support@mockify.dev

---

<div align="center">
  <p>Made with ❤️ by the Mockify Team</p>
  <p>
    <a href="https://github.com/sujin-sreekumaran/mockify">⭐ Star us on GitHub</a> •
    <a href="https://mockify.dev">🌐 Visit Website</a>
  </p>
</div>
