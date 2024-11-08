import {loadEnvVars} from './config';
loadEnvVars();

import {CatchopzInterviewBackendApplication} from './application';
import {MysqlDataSource} from './datasources';

export async function migrate(args: string[]) {
  const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter';
  console.log('Migrating schemas (%s existing schema)', existingSchema);

  const tablesInOrder = ['Todo', 'Item'];

  // migrate DB from Models by Loopback 4
  const app = new CatchopzInterviewBackendApplication();
  await app.boot();
  await app.migrateSchema({
    existingSchema,
    models: tablesInOrder,
  });

  // Further customize the "updatedAt" field to auto-update on every tables by SQL
  const ds = await app.get<MysqlDataSource>('datasources.mysql');

  for (const table of tablesInOrder) {
    if (!tablesInOrder.includes(table)) {
      throw new Error(`Invalid table name: ${table}`);
    }

    const SQL =
      'ALTER TABLE ?? MODIFY updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;';

    await ds.execute(SQL, [table]);
  }

  console.log('Custom SQL applied for updatedAt fields on all tables.');

  // Connectors usually keep a pool of opened connections,
  // this keeps the process running even after all work is done.
  // We need to exit explicitly.
  process.exit(0);
}

migrate(process.argv).catch(err => {
  console.error('Cannot migrate database schema', err);
  process.exit(1);
});
