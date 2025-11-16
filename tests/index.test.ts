import { expect, test } from "bun:test";
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { COUNTER_SIZE, schema } from "./types";
import * as borsh from "borsh";

let adminAccount = Keypair.generate();
let dataAccount = Keypair.generate();
const PROGRAM_ID = new PublicKey(
  "8c9PQ5v7jnThRbzhyk1JQAi3LJstNnbpy8taNpUqnwJL",
);
const connection = new Connection("http://127.0.0.1:8899");

test("account is initialized", async () => {
  const txn = await connection.requestAirdrop(
    adminAccount.publicKey,
    1 * 1000_000_000,
  );
  await connection.confirmTransaction(txn);

  const data = await connection.getAccountInfo(adminAccount.publicKey);
  //airdrop done successfully
  //
  const lamports =
    await connection.getMinimumBalanceForRentExemption(COUNTER_SIZE);

  const ix = SystemProgram.createAccount({
    fromPubkey: adminAccount.publicKey,
    newAccountPubkey: dataAccount.publicKey,
    lamports,
    space: COUNTER_SIZE,
    programId: PROGRAM_ID,
  });

  const createAccountTxn = new Transaction();
  createAccountTxn.add(ix);
  const signature = await connection.sendTransaction(createAccountTxn, [
    adminAccount,
    dataAccount,
  ]);
  await connection.confirmTransaction(signature);
  console.log(
    "Account created with address:",
    dataAccount.publicKey.toBase58(),
  );

  const dataAccountInfo = await connection.getAccountInfo(
    dataAccount.publicKey,
  );
  console.log("Data Account Info:", dataAccountInfo?.data);
  const counter = borsh.deserialize(schema, dataAccountInfo!.data);
  console.log("Counter Value:", counter.count);
  expect(counter.count).toBe(0);
});
