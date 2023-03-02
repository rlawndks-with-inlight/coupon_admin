import axios from "axios"
import { backUrl } from "src/data/data";

export default async (req, res) => {
  try {
    // let hostname = req.headers.referer.split('/');
    // hostname = hostname[0] + '//' + hostname[2]
    // console.log(hostname)
    let response = await axios.get(backUrl + '/api/v1/auth/domain', {
      dns: req.headers.host.split(':')[0]
    });
    res.json(response?.data);
  } catch (err) {
    console.log(err)
  }

}
