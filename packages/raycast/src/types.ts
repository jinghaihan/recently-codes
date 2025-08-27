import type { Grid, List } from '@raycast/api'
import type { EntryItem } from 'recently-codes'

export type PinnedMovement = 'up' | 'right' | 'down' | 'left'

export interface PinMethods {
  pin: (entry: EntryItem) => void
  moveUp: (entry: EntryItem) => void
  moveDown: (entry: EntryItem) => void
  unpin: (entry: EntryItem) => void
  unpinAll: () => void
  getAllowedMovements: (entry: EntryItem) => PinnedMovement[]
}

export interface RemoveMethods {
  removeEntry: (entry: EntryItem) => Promise<void>
  removeAllEntries: () => Promise<void>
}

export enum EntryType {
  Folders = 'Folders',
  Files = 'Files',
  AllTypes = 'All Types',
}

export type ListType = 'list'
export type GridType = 'grid'

export type LayoutProps = List.Props | Grid.Props
export type LayoutSectionProps = List.Section.Props | Grid.Section.Props
export type LayoutItemProps = List.Item.Props | Grid.Item.Props
export type LayoutEmptyViewProps = List.EmptyView.Props | Grid.EmptyView.Props

export type LayoutDropdownProps = List.Dropdown.Props | Grid.Dropdown.Props
export type LayoutDropdownSectionProps = List.Dropdown.Section.Props | Grid.Dropdown.Section.Props
export type LayoutDropdownItemProps = List.Dropdown.Item.Props | Grid.Dropdown.Item.Props
