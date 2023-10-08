
import { PieChart, Pie } from 'recharts';
const PieChartComponent = ({data}) => {
    return (
        <div>
            <PieChart width={730} height={250}>
                <Pie data={data} dataKey="result" nameKey="type" cx="50%" cy="50%" outerRadius={50} fill="#0a7e0a" />
                <Pie data={data} dataKey="result" nameKey="type" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#00FF00" label />
            </PieChart>
        </div>)
}
export default PieChartComponent