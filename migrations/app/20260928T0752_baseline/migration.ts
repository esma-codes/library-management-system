#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/775a825c9e2a34a4efcf2100419a3191f265114c10e069cb58f482f93172895d/contract';
import endContract from '../../snapshots/775a825c9e2a34a4efcf2100419a3191f265114c10e069cb58f482f93172895d/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, lit, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'kitap',
        columns: [
          col('ad', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('eklenme', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('ozet', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('stok_sayisi', 'int4', {
            notNull: true,
            default: lit(1),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('tur', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('yazar', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
