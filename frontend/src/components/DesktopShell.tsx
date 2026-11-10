import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SIDEBAR_WIDTH, useLayout } from '../hooks/use-layout';

const NAV: { path: string; title: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { path: '/', title: 'Главная', icon: 'home-outline' },
  { path: '/catalog', title: 'Каталог', icon: 'grid-outline' },
  { path: '/camera', title: 'Поиск по фото', icon: 'camera-outline' },
  { path: '/barcode-scanner', title: 'Сканер кода', icon: 'barcode-outline' },
  { path: '/submit-pending', title: 'Отправить товар', icon: 'add-circle-outline' },
  { path: '/pending-list', title: 'Заявки', icon: 'clipboard-outline' },
  { path: '/search-stats', title: 'Статистика поиска', icon: 'bar-chart-outline' },
];

// Списки и дашборды занимают всю ширину, формы и карточки — узкую колонку
const WIDE_ROUTES = ['/', '/catalog', '/pending-list', '/search-stats'];

export default function DesktopShell({ children }: { children: React.ReactNode }) {
  const { isDesktop } = useLayout();
  const pathname = usePathname();
  const router = useRouter();

  if (!isDesktop) return <>{children}</>;

  const isActive = (path: string) => (path === '/' ? pathname === '/' : pathname.startsWith(path));
  const maxWidth = WIDE_ROUTES.includes(pathname) ? 1200 : 820;

  return (
    <View style={styles.root}>
      <View style={styles.sidebar}>
        <TouchableOpacity onPress={() => router.push('/')} style={styles.brand} activeOpacity={0.7}>
          <Text style={styles.brandTitle}>Ansar HomeWear</Text>
          <Text style={styles.brandSub}>Каталог и поиск товаров</Text>
        </TouchableOpacity>

        {NAV.map((item) => {
          const active = isActive(item.path);
          return (
            <TouchableOpacity
              key={item.path}
              style={[styles.navItem, active && styles.navItemActive]}
              onPress={() => router.push(item.path as any)}
              activeOpacity={0.7}
            >
              <Ionicons name={item.icon} size={20} color={active ? '#4F46E5' : '#6B7280'} />
              <Text style={[styles.navText, active && styles.navTextActive]}>{item.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.content}>
        <View style={[styles.page, { maxWidth }]}>{children}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, flexDirection: 'row', backgroundColor: '#F3F4F6' },
  sidebar: {
    width: SIDEBAR_WIDTH, backgroundColor: 'white',
    borderRightWidth: 1, borderRightColor: '#E5E7EB',
    paddingHorizontal: 14, paddingTop: 24, gap: 4,
  },
  brand: { paddingHorizontal: 10, paddingBottom: 20 },
  brandTitle: { fontSize: 18, fontWeight: '700', color: '#111827', letterSpacing: -0.4 },
  brandSub: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  navItem: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10,
  },
  navItemActive: { backgroundColor: '#EEF2FF' },
  navText: { fontSize: 14, fontWeight: '500', color: '#374151' },
  navTextActive: { color: '#4F46E5', fontWeight: '600' },
  content: { flex: 1, alignItems: 'center' },
  page: { flex: 1, width: '100%' },
});
