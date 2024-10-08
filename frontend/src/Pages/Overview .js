import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "jspdf-autotable"; // Import jsPDF AutoTable

// Register the required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Overview = () => {
    const [totalTherapySessions, setTotalTherapySessions] = useState(0);
    const [totalMobilityRequirements, setTotalMobilityRequirements] = useState(0);
    const [totalMobilityEquipment, setTotalMobilityEquipment] = useState(0);
    const [schedules, setSchedules] = useState([]); // State for all schedules
    const [requirements, setRequirements] = useState([]); // State for all requirements
    const [equipment, setEquipment] = useState([]); // State for all equipment
    const navigate = useNavigate();
    const chartRef = useRef(null); // Reference to the chart container

    useEffect(() => {
        const fetchOverviewData = async () => {
            try {
                const therapyResponse = await axios.get("http://localhost:3000/shedule");
                const requirementsResponse = await axios.get("http://localhost:3000/request");
                const equipmentResponse = await axios.get("http://localhost:3000/e");

                setTotalTherapySessions(therapyResponse.data.length);
                setTotalMobilityRequirements(requirementsResponse.data.length);
                setTotalMobilityEquipment(equipmentResponse.data.length);
                
                // Set detailed data for the PDF summary
                setSchedules(therapyResponse.data);
                setRequirements(requirementsResponse.data);
                setEquipment(equipmentResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchOverviewData();
    }, []);

    const handleNavigateToProfiles = () => {
        navigate("/elder"); // Navigate to the profiles page
    };

    // Chart data
    const chartData = {
        labels: ["Therapy Sessions", "Mobility Requirements", "Mobility Equipment"],
        datasets: [
            {
                label: "Count",
                data: [totalTherapySessions, totalMobilityRequirements, totalMobilityEquipment],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                borderColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Mobility and Therapy Overview",
            },
        },
    };

    // Function to generate PDF with chart and overview data
    const generatePDF = async () => {
        const chartElement = chartRef.current; // Get the chart element
        const canvas = await html2canvas(chartElement); // Capture chart as image
        const imageData = canvas.toDataURL("image/png"); // Convert chart to image

        const pdf = new jsPDF("landscape"); // Create a PDF in landscape mode
        pdf.addImage(imageData, "PNG", 10, 10, 280, 100); // Add chart image to PDF

        // Add overview data to PDF
        pdf.setFontSize(16);
        pdf.text("Overview Report", 140, 120, { align: "center" });
        pdf.setFontSize(12);
        pdf.text(`Total Therapy Sessions: ${totalTherapySessions}`, 20, 140);
        pdf.text(`Total Mobility Requirements: ${totalMobilityRequirements}`, 20, 150);
        pdf.text(`Total Mobility Equipment: ${totalMobilityEquipment}`, 20, 160);

        // Save the PDF
        pdf.save("Overview_Report.pdf");
    };

    // Function to generate a summary PDF with detailed data
    const generateSummaryPDF = async () => {
        const chartElement = chartRef.current; // Get the chart element
        const canvas = await html2canvas(chartElement); // Capture chart as image
        const imageData = canvas.toDataURL("image/png"); // Convert chart to image

        const pdf = new jsPDF("landscape");

        // Add Overview data
        pdf.setFontSize(16);
        pdf.text("Detailed Summary Report", 140, 20, { align: "center" });
        pdf.setFontSize(12);
        pdf.text(`Total Therapy Sessions: ${totalTherapySessions}`, 20, 40);
        pdf.text(`Total Mobility Requirements: ${totalMobilityRequirements}`, 20, 50);
        pdf.text(`Total Mobility Equipment: ${totalMobilityEquipment}`, 20, 60);

        // Add chart image to the summary PDF
        pdf.addImage(imageData, "PNG", 10, 70, 280, 100); // Add chart image to PDF

        // Add a page for schedules
        pdf.addPage();
        pdf.setFontSize(14);
        pdf.text("Schedules:", 20, 20);

        // Create Schedule Table
        pdf.autoTable({
            head: [['Schedule', 'Name', 'Age', 'Phone', 'Email', 'NIC', 'Status', 'Condition', 'Previous Therapy', 'Therapy Goal', 'Date', 'Preferred Time', 'Frequency', 'Location']],
            body: schedules.map((schedule, index) => [
                index + 1,
                schedule.name,
                schedule.age,
                schedule.phone_number,
                schedule.email,
                schedule.NIC,
                schedule.current_status,
                schedule.current_physical_condition,
                schedule.previous_therapy,
                schedule.therapy_goal,
                new Date(schedule.date).toLocaleDateString(),
                schedule.preffered_time,
                schedule.frequency,
                schedule.location
            ]),
            startY: 30,
            margin: { horizontal: 10 },
        });

        // Add a page for requirements
        pdf.addPage();
        pdf.setFontSize(14);
        pdf.text("Requirements:", 20, 20);

        // Create Requirement Table
        pdf.autoTable({
            head: [['Requirement', 'Elder ID', 'Request']],
            body: requirements.map((requirement, index) => [
                index + 1,
                requirement.elderId,
                requirement.requests
            ]),
            startY: 30,
            margin: { horizontal: 10 },
        });

       // Add a page for equipment
    pdf.addPage();
    pdf.setFontSize(14);
    pdf.text("Equipment:", 20, 20);

    // Create Equipment Table
    pdf.autoTable({
        head: [['ID', 'Name', 'Description', 'Category', 'Condition', 'Model Number']],
        body: equipment.map((item, index) => [
            item._id, // Equipment ID
            item.name, // Equipment Name
            item.discription, // Equipment Description
            item.category, // Equipment Category
            item.condition, // Equipment Condition
            item.model_number // Equipment Model Number
        ]),
        startY: 30,
        margin: { horizontal: 10 },
    });

        // Save the summary PDF
        pdf.save("Summary_Report.pdf");
    };

    return (
        <div style={{ padding: "70px" }}>
            <h1 style={{ textAlign: "center" }}>Overview</h1>
            <ul>
                <li>Total Therapy Sessions: {totalTherapySessions}</li>
                <li>Total Mobility Requirements: {totalMobilityRequirements}</li>
                <li>Total Mobility Equipment: {totalMobilityEquipment}</li>
            </ul>

            {/* Bar Chart */}
            <div ref={chartRef} style={{ width: "80%", margin: "0 auto" }}>
                <Bar data={chartData} options={chartOptions} />
            </div>

            {/* Buttons */}
            <div style={{ marginTop: "20px", textAlign: "center" }}>
                <button className="btn btn-primary" onClick={handleNavigateToProfiles} style={{ marginRight: "10px" }}>
                    View Profiles
                </button>
                <button className="btn btn-secondary" onClick={generatePDF}
                style={{ backgroundColor: "#6B75FE", color: "white" }}>
                    Generate PDF
                </button>
                <button className="btn btn-success" onClick={generateSummaryPDF}
                style={{ backgroundColor: "#6B75FE", color: "white", marginLeft: "10px" }}>
                    Generate Summary PDF
                </button>
            </div>
        </div>
    );
};

export default Overview;
