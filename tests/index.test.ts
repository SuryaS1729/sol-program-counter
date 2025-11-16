import { expect, test } from "bun:test";
import { Connection, Keypair } from "@solana/web3.js";

let adminAccount = Keypair.generate();
let dataAccount = Keypair.generate();

test("account is initialized", async () => {
  const connection = new Connection("http://127.0.0.1:8899");
  const txn = await connection.requestAirdrop(
    adminAccount.publicKey,
    1 * 1000_000_000,
  );
  await connection.confirmTransaction(txn);

  const data = await connection.getAccountInfo(adminAccount.publicKey);
  console.log(data);
});
