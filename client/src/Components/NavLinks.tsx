import { QuickLinks } from './QuickLinks';
import { InputAndMenu } from './InputAndMenu';

export function NavLinks() {
  return (
    <nav className="content-container flex items-center justify-between">
      <QuickLinks />
      <InputAndMenu />
    </nav>
  );
}
