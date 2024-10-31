export interface Bounty {
  uid: string;
  title: string;
  summary_text: string;
  current_state: string;
  poster: {
    display_name: string;
    short_name: string;
  };
  reward_summary: {
    usd_value: string;
    token: {
      symbol: string;
    };
  };
  links: {
    external: string;
  };
  created_at: string;
  expiration_date: string;
  quota?: Quota;
  channel?: Channel; 
}

interface Channel {
    name: string;
    image_url: string;
    parent_url: string;
}

interface Quota {
    total: number;
    remaining: number;
}
