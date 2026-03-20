export interface Account {
  id: string;
  email: string;
  name: string;
  password: string;
}

const accounts: Account[] = [
  {
    id: "alice",
    email: "alice@example.com",
    name: "Alice",
    password: "password",
  },
  {
    id: "bob",
    email: "bob@example.com",
    name: "Bob",
    password: "password",
  },
];

export function findAccountByLogin(login: string): Account | undefined {
  return accounts.find(
    (a) => a.email === login || a.id === login,
  );
}

export function findAccountById(id: string): Account | undefined {
  return accounts.find((a) => a.id === id);
}

export function searchAccounts(query: string): Account[] {
  const lower = query.toLowerCase();
  return accounts.filter((a) => a.name.toLowerCase().includes(lower));
}

export const accountStore = {
  findAccount(_ctx: unknown, id: string) {
    const account = findAccountById(id);
    if (!account) return undefined;
    return {
      accountId: account.id,
      async claims() {
        return {
          sub: account.id,
          email: account.email,
          name: account.name,
        };
      },
    };
  },

  authenticate(email: string, password: string): Account | undefined {
    const account = findAccountByLogin(email);
    if (account && account.password === password) {
      return account;
    }
    return undefined;
  },
};
