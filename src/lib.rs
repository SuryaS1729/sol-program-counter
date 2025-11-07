use solana_program::{
    account_info::{AccountInfo, next_account_info, next_account_infos},
    entrypoint::{self, ProgramResult},
    msg,
    pubkey::Pubkey,
};

enum InstructionType {
    Increment(u32),
    Decrement(u32),
}

entrypoint!(counter_contract);

pub fn counter_contract(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let acc = next_account_info(&mut accounts.iter())?;
}
