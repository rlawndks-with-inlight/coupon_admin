import axios from "axios"
import { backUrl } from "src/data/data";

export default async (req, res) => {
  try {
    // let hostname = req.headers.referer.split('/');
    // hostname = hostname[0] + '//' + hostname[2]
    // console.log(hostname)
    let response = await axios.options(backUrl + '/api/v1/auth/domain', {
      data: {
        dns: req.headers.host.split(':')[0]
      },
    });
    res.json(response?.data);
  } catch (err) {
    console.log(err)
    console.log(123)
  }

}
