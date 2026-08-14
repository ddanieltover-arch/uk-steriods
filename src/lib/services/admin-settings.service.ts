import { db } from '../db';

export class AdminStoreSettingsService {
  static async getSettings() {
    const settings = await db.storeSetting.findMany();
    const map: Record<string, string> = {
      storeName: 'Steroids UK',
      supportEmail: 'sales@uk-steroids.co.uk',
      currency: 'GBP',
      freeShippingThresholdPence: '10000',
      maintenanceMode: 'false',
    };

    for (const s of settings) {
      map[s.key] = s.value;
    }

    return map;
  }

  static async updateSetting(key: string, value: string) {
    return db.storeSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }

  static async updateSettings(settingsMap: Record<string, string>) {
    const updates = Object.entries(settingsMap).map(([key, value]) =>
      db.storeSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      })
    );

    await db.$transaction(updates);
    return this.getSettings();
  }
}
