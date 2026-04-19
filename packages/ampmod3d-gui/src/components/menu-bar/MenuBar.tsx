import * as Menubar from '@radix-ui/react-menubar';
import styles from './MenuBar.module.css';

// 1. Define structure with IDs
const MENU_DATA = [
  {
    label: 'File',
    id: 'menu-file',
    items: [
      { label: 'New Project', id: 'file-new' },
      { label: 'Save Project', id: 'file-save' },
      { type: 'separator' },
      { label: 'Export current stage .GLB', id: 'file-export' },
    ],
  },
  {
    label: 'Edit',
    id: 'menu-edit',
    items: [
      { label: 'Undo', id: 'edit-undo' },
      { label: 'Redo', id: 'edit-redo' },
    ],
  },
  {
    label: 'Settings',
    id: 'menu-settings',
    items: [
      { label: 'Theme', id: 'settings-theme' },
      { label: 'Workspace Config', id: 'settings-workspace' },
    ],
  },
];

export default function MenuBar() {
  return (
    <Menubar.Root className={styles.menubarRoot}>
      <div className={styles.logoArea}>
        AmpMod <span style={{ color: '#FFBF00' }}>3D</span>
      </div>

      {MENU_DATA.map((menu) => (
        <Menubar.Menu key={menu.id}>
          <Menubar.Trigger 
            className={styles.menubarTrigger} 
            id={menu.id}
          >
            {menu.label}
          </Menubar.Trigger>
          
          <Menubar.Portal>
            <Menubar.Content 
              className={styles.menubarContent} 
              align="start" 
              sideOffset={0} 
              alignOffset={-3}
            >
              {menu.items.map((item, index) => 
                item.type === 'separator' ? (
                  <Menubar.Separator 
                    key={`sep-${index}`} 
                    style={{ height: 1, backgroundColor: '#eee', margin: '5px' }} 
                  />
                ) : (
                  <Menubar.Item 
                    key={item.id} 
                    id={item.id} 
                    className={styles.menubarItem}
                    onSelect={() => console.log(`${item.id} clicked`)}
                  >
                    {item.label}
                  </Menubar.Item>
                )
              )}
            </Menubar.Content>
          </Menubar.Portal>
        </Menubar.Menu>
      ))}
    </Menubar.Root>
  );
}