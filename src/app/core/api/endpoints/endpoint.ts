// import { DeleteBodyRequset } from '../../../features/lecture/models/delete-body-requset-model';
import { LoginRequest} from '../../../features/auth/model/login_request_model';

const API_BASE_URL = '/api';
const tenantId = 'caafs.edu.ly';

export const API_ENDPOINT = {
  LOGIN: {
    LOGIN_URL: `${API_BASE_URL}/${tenantId}/auth/login`,
  },
}