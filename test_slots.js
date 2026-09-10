const supabaseUrl = 'https://oxeletoefzwusapwygck.supabase.co';
const anonKey = 'sb_publishable_PbZTlW8PEqa3eIItDag98g_Q_27qv6G';
async function run() {
    const res = await fetch(supabaseUrl + '/rest/v1/blocked_slots', {
      headers: {
        'apikey': anonKey,
        'Authorization': 'Bearer ' + anonKey
      }
    });
    console.log(res.status);
}
run();
