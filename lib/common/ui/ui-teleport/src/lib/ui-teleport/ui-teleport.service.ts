import {
  EnvironmentInjector,
  Injectable,
  Injector,
  NgModuleRef,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiTeleportService {
  private readonly activeTeleportsSubject = new BehaviorSubject<Set<string>>(
    new Set([]),
  );

  private readonly teleportOutletMap = new Map<string, ViewContainerRef>();

  isTeleportationActive$(key: string | null): Observable<boolean> {
    return this.activeTeleportsSubject
      .asObservable()
      .pipe(
        map(
          (activeTeleports): boolean =>
            key !== null && activeTeleports.has(key),
        ),
      );
  }

  registerPortalOutlet(key: string, viewContainerRef: ViewContainerRef): void {
    if (this.teleportOutletMap.has(key)) {
      throw new Error(`Portal outlet with key ${key} is already registered!`);
    }

    this.teleportOutletMap.set(key, viewContainerRef);
  }

  unregisterPortalOutlet(key: string): void {
    this.teleportOutletMap.delete(key);
    this.removeFromActiveTeleports(key);
  }

  startTeleportation(key: string, templateRef: TemplateRef<unknown>): void {
    const outlet = this.teleportOutletMap.get(key);

    if (outlet) {
      outlet.createEmbeddedView(templateRef);
      this.addToActiveTeleports(key);
    } else {
      console.warn(`Portal outlet with key ${key} is not registered!`);
    }
  }

  startTeleportationWithComponent(
    key: string,
    component: Type<unknown>,
    environmentInjector: EnvironmentInjector | NgModuleRef<unknown>, // to ensure we have all deps
    parentInjector?: Injector, // to provide extra deps
  ): void {
    const outlet = this.teleportOutletMap.get(key);

    if (outlet) {
      outlet.clear();
      outlet.createComponent(component, {
        injector: parentInjector,
        environmentInjector,
      });
      this.addToActiveTeleports(key);
    } else {
      console.warn(`Portal outlet with key ${key} is not registered!`);
    }
  }

  finishTeleportation(key: string): void {
    this.teleportOutletMap.get(key)?.clear();
    this.removeFromActiveTeleports(key);
  }

  private addToActiveTeleports(key: string): void {
    const currentTeleportsSet = this.activeTeleportsSubject.value;
    currentTeleportsSet.add(key);
    this.activeTeleportsSubject.next(new Set(currentTeleportsSet));
  }

  private removeFromActiveTeleports(key: string): void {
    const currentTeleportsSet = this.activeTeleportsSubject.value;
    currentTeleportsSet.delete(key);
    this.activeTeleportsSubject.next(new Set(currentTeleportsSet));
  }
}
