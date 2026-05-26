/* ============================================================
   TERM/UI :: LIBRARY ENTRY
   Used by vite.lib.config.js to build the publishable npm package.
   Consumers do:
     import { Button, ThemeProvider } from 'term-ui'
     import 'term-ui/style.css'
   The showcase site doesn't go through here — it still imports
   from relative paths in src/.
   ============================================================ */

import './styles/tokens.css'
import './styles/global.css'
import './components/ui/components.css'

/* components */
export {
  Button,
  Input,
  Textarea,
  Select,
  Checkbox,
  RadioGroup,
  Switch,
  Card,
  Accordion,
  Tabs,
  WindowTabs,
  Table,
  Sidebar,
  Modal,
  Tooltip,
  Alert,
  Badge,
  ToastProvider,
  useToast,
  Loading,
  Typewriter,
} from './components/ui/index.js'

/* theme system */
export { ThemeProvider, useTheme } from './theme/ThemeProvider.jsx'
export {
  THEMES,
  DEFAULT_THEME,
  DEFAULT_CUSTOM_COLOR,
  STORAGE_KEY,
  STORAGE_KEY_CUSTOM,
  QUICK_COLORS,
  isValidTheme,
} from './theme/themes.js'
export {
  hexToRgb,
  rgbToHsl,
  hslToHex,
  isValidHex,
  generatePalette,
  PALETTE_VARS,
} from './theme/colorUtils.js'
