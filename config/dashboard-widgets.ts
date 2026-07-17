import { Permission } from '@/constants/permissions';

export type WidgetSize = 'sm' | 'md' | 'lg' | 'xl';
export type FilterType = 'DATE_RANGE' | 'PROGRAM' | 'PROJECT' | 'CAMPAIGN' | 'EVENT' | 'VOLUNTEER' | 'CATEGORY' | 'STATUS' | 'LOCATION';

export interface WidgetDefinition {
  id: string;
  title: string;
  description: string;
  icon?: string;
  permissions: Permission[];
  defaultSize: WidgetSize;
  defaultPosition: { x: number; y: number; w: number; h: number };
  visibility: 'PUBLIC' | 'INTERNAL' | 'PRIVATE';
  supportedFilters: FilterType[];
}

class DashboardWidgetRegistry {
  private widgets: Map<string, WidgetDefinition> = new Map();

  register(widget: WidgetDefinition) {
    if (this.widgets.has(widget.id)) {
      console.warn(`Widget ${widget.id} is already registered.`);
      return;
    }
    this.widgets.set(widget.id, widget);
  }

  registerMany(widgets: WidgetDefinition[]) {
    widgets.forEach(w => this.register(w));
  }

  getAll(): WidgetDefinition[] {
    return Array.from(this.widgets.values());
  }

  getWidget(id: string): WidgetDefinition | undefined {
    return this.widgets.get(id);
  }
}

export const widgetRegistry = new DashboardWidgetRegistry();

// Standard widgets
widgetRegistry.registerMany([
  {
    id: 'revenue_growth',
    title: 'Revenue Growth',
    description: 'Monthly revenue growth trends',
    permissions: ['analytics.view' as Permission],
    defaultSize: 'md',
    defaultPosition: { x: 0, y: 0, w: 2, h: 2 },
    visibility: 'INTERNAL',
    supportedFilters: ['DATE_RANGE', 'CAMPAIGN']
  },
  {
    id: 'volunteer_activity',
    title: 'Volunteer Activity',
    description: 'Active volunteers over time',
    permissions: ['analytics.view' as Permission],
    defaultSize: 'sm',
    defaultPosition: { x: 2, y: 0, w: 1, h: 2 },
    visibility: 'INTERNAL',
    supportedFilters: ['DATE_RANGE', 'EVENT']
  }
]);
