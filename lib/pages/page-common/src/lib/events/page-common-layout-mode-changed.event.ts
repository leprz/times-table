import { LayoutMode } from '../layout-mode/page-common-layout-mode.component';
import { Event } from '@org/message-bus';

export class PageCommonLayoutModeChangedEvent<T extends {layoutMode: LayoutMode}> extends Event<T> {}