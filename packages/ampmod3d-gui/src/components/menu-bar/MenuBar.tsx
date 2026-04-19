import * as Menubar from '@radix-ui/react-menubar';
import styles from './MenuBar.module.css';

export default function MenuBar() {
  return (
    <Menubar.Root className={styles.menubarRoot}>
      <div className={styles.logoArea}>
        AmpMod <span style={{ color: '#FFBF00' }}>3D</span>
      </div>

      {/* FILE MENU */}
      <Menubar.Menu>
        <Menubar.Trigger className={styles.menubarTrigger}>
          File
        </Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content className={styles.menubarContent} align="start" sideOffset={5} alignOffset={-3}>
            <Menubar.Item className={styles.menubarItem}>New Project</Menubar.Item>
            <Menubar.Item className={styles.menubarItem}>Save Project</Menubar.Item>
            <Menubar.Separator style={{ height: 1, backgroundColor: '#eee', margin: '5px' }} />
            <Menubar.Item className={styles.menubarItem}>Export current stage .GLB</Menubar.Item>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>

      {/* EDIT MENU */}
      <Menubar.Menu>
        <Menubar.Trigger className={styles.menubarTrigger}>
          Edit
        </Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content className={styles.menubarContent} align="start" sideOffset={5} alignOffset={-3}>
            <Menubar.Item className={styles.menubarItem}>Undo</Menubar.Item>
            <Menubar.Item className={styles.menubarItem}>Redo</Menubar.Item>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>

      {/* SETTINGS MENU */}
      <Menubar.Menu>
        <Menubar.Trigger className={styles.menubarTrigger}>
          Settings
        </Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content className={styles.menubarContent} align="start" sideOffset={5} alignOffset={-3}>
            <Menubar.Item className={styles.menubarItem}>Theme</Menubar.Item>
            <Menubar.Item className={styles.menubarItem}>Workspace Config</Menubar.Item>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>
    </Menubar.Root>
  );
};