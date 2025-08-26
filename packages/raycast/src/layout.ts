import type {
  LayoutDropdownItemProps,
  LayoutDropdownProps,
  LayoutDropdownSectionProps,
  LayoutEmptyViewProps,
  LayoutItemProps,
  LayoutProps,
  LayoutSectionProps,
} from './types'
import { Grid, List } from '@raycast/api'
import { preferences } from './preferences'

export function Layout(props: LayoutProps) {
  return preferences.layout === 'list' ? List(props) : Grid(props)
}

export function LayoutSection(props: LayoutSectionProps) {
  return preferences.layout === 'list' ? List.Section(props) : Grid.Section(props)
}

export function LayoutItem(props: LayoutItemProps) {
  return preferences.layout === 'list'
    ? List.Item(props as List.Item.Props)
    : Grid.Item(props as Grid.Item.Props)
}

export function LayoutEmptyView(props: LayoutEmptyViewProps) {
  return preferences.layout === 'list' ? List.EmptyView(props) : Grid.EmptyView(props)
}

export function LayoutDropdown(props: LayoutDropdownProps) {
  return preferences.layout === 'list'
    ? List.Dropdown(props as List.Dropdown.Props)
    : Grid.Dropdown(props as Grid.Dropdown.Props)
}

export function LayoutDropdownSection(props: LayoutDropdownSectionProps) {
  return preferences.layout === 'list' ? List.Dropdown.Section(props) : Grid.Dropdown.Section(props)
}

export function LayoutDropdownItem(props: LayoutDropdownItemProps) {
  return preferences.layout === 'list'
    ? List.Dropdown.Item(props as List.Dropdown.Item.Props)
    : Grid.Dropdown.Item(props as Grid.Dropdown.Item.Props)
}
