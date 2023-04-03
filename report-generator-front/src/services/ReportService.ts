import axios from 'axios';
import IGetReport from '../model/IGetReport';
import IRequestReport from '../model/IRequestReport';

export abstract class ReportService {
    private static axios = axios.create({
        baseURL: `${process.env.REACT_APP_API_URLPATH}/api/report`,
        headers: {
            'Content-Type': 'Application/json'
        }
    });

    static async requestReport() {
        const url = '';
        try {
            const response = await this.axios.get<IRequestReport>(url);
            if (response.status === 200) {
                return response.data;
            }
            return null;
        } catch (error) {
            console.log('error', error);
            return null;
        }
    }

    static async getReport(requestId: string) {
        const url = `/${requestId}`;
        try {
            const response = await this.axios.get<IGetReport>(url);
            if (response.status === 200) {
                return response.data;
            }
            return null;
        } catch (error) {
            console.log('error', error);
            return null;
        }
    }
}
