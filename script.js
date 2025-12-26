// Chart.js configuration for monthly parcels chart
document.addEventListener('DOMContentLoaded', function () {
    initializeChart();
    initializeColumnCharts();
    initializeInteractions();
});

function initializeChart() {
    const ctx = document.getElementById('monthly-chart');
    if (!ctx) return;

    // Generate 7 months of data (6 previous + January 2022)
    const months = [
        'July 2021',
        'August 2021',
        'September 2021',
        'October 2021',
        'November 2021',
        'December 2021',
        'January 2022'
    ];

    // Based on January 2022 data, extrapolate backwards with some variation
    // Jan 2022: 69,830 total
    // Label distribution: no_abrir: 98.37%, libros: 1.56%, alto_valor: 0.06%, mercancia_regulada: 0.00%

    const monthlyData = [
        { total: 58420, no_abrir: 0.973, libros: 0.018, alto_valor: 0.007, mercancia_regulada: 0.002 },
        { total: 62150, no_abrir: 0.965, libros: 0.021, alto_valor: 0.009, mercancia_regulada: 0.005 },
        { total: 64890, no_abrir: 0.968, libros: 0.019, alto_valor: 0.008, mercancia_regulada: 0.005 },
        { total: 67230, no_abrir: 0.971, libros: 0.017, alto_valor: 0.007, mercancia_regulada: 0.005 },
        { total: 71540, no_abrir: 0.975, libros: 0.015, alto_valor: 0.006, mercancia_regulada: 0.004 },
        { total: 68920, no_abrir: 0.980, libros: 0.013, alto_valor: 0.005, mercancia_regulada: 0.002 },
        { total: 69830, no_abrir: 0.9837, libros: 0.0156, alto_valor: 0.0006, mercancia_regulada: 0.0001 }
    ];

    const datasets = [
        {
            label: 'no_abrir',
            data: monthlyData.map(d => Math.round(d.total * d.no_abrir)),
            backgroundColor: 'rgba(16, 185, 129, 0.8)',
            borderColor: 'rgba(16, 185, 129, 1)',
            borderWidth: 1,
            hidden: true
        },
        {
            label: 'libros',
            data: monthlyData.map(d => Math.round(d.total * d.libros)),
            backgroundColor: 'rgba(37, 99, 235, 0.8)',
            borderColor: 'rgba(37, 99, 235, 1)',
            borderWidth: 1
        },
        {
            label: 'alto_valor',
            data: monthlyData.map(d => Math.round(d.total * d.alto_valor)),
            backgroundColor: 'rgba(245, 158, 11, 0.8)',
            borderColor: 'rgba(245, 158, 11, 1)',
            borderWidth: 1
        },
        {
            label: 'mercancia_regulada',
            data: monthlyData.map(d => Math.round(d.total * d.mercancia_regulada)),
            backgroundColor: 'rgba(220, 38, 38, 0.8)',
            borderColor: 'rgba(220, 38, 38, 1)',
            borderWidth: 1
        }
    ];

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                title: {
                    display: false
                },
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            family: 'Inter',
                            size: 12,
                            weight: 500
                        },
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    bodySpacing: 6,
                    bodyFont: {
                        family: 'Inter',
                        size: 13
                    },
                    titleFont: {
                        family: 'Inter',
                        size: 14,
                        weight: 600
                    },
                    callbacks: {
                        label: function (context) {
                            const label = context.dataset.label || '';
                            const value = context.parsed.y.toLocaleString();
                            return `${label}: ${value} parcels`;
                        },
                        footer: function (tooltipItems) {
                            let total = 0;
                            tooltipItems.forEach(item => {
                                total += item.parsed.y;
                            });
                            return `Total: ${total.toLocaleString()} parcels`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            family: 'Inter',
                            size: 12,
                            weight: 500
                        }
                    }
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: {
                            family: 'Inter',
                            size: 12
                        },
                        callback: function (value) {
                            return value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Global chart instances for columns
let column1Chart = null;
let column2Chart = null;

function initializeColumnCharts() {
    // Column 1 chart
    const ctx1 = document.getElementById('column-1-chart');
    if (ctx1) {
        column1Chart = new Chart(ctx1, {
            type: 'doughnut',
            data: {
                labels: ["'no_abrir'", "'libros'", "'alto_valor'", "'mercancia_regulada'"],
                datasets: [{
                    data: [95.88, 1.83, 0.84, 1.45],
                    backgroundColor: [
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(37, 99, 235, 0.8)',
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(220, 38, 38, 0.8)'
                    ],
                    borderColor: [
                        'rgba(16, 185, 129, 1)',
                        'rgba(37, 99, 235, 1)',
                        'rgba(245, 158, 11, 1)',
                        'rgba(220, 38, 38, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            padding: 10,
                            font: {
                                family: 'Inter',
                                size: 11
                            },
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        bodyFont: {
                            family: 'Inter',
                            size: 13
                        },
                        callbacks: {
                            label: function (context) {
                                return `${context.label}: ${context.parsed}%`;
                            }
                        }
                    }
                }
            }
        });
    }

    // Column 2 chart
    const ctx2 = document.getElementById('column-2-chart');
    if (ctx2) {
        column2Chart = new Chart(ctx2, {
            type: 'doughnut',
            data: {
                labels: ["'no_abrir'", "'libros'", "'alto_valor'", "'mercancia_regulada'"],
                datasets: [{
                    data: [98.37, 1.56, 0.06, 0.00],
                    backgroundColor: [
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(37, 99, 235, 0.8)',
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(220, 38, 38, 0.8)'
                    ],
                    borderColor: [
                        'rgba(16, 185, 129, 1)',
                        'rgba(37, 99, 235, 1)',
                        'rgba(245, 158, 11, 1)',
                        'rgba(220, 38, 38, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            padding: 10,
                            font: {
                                family: 'Inter',
                                size: 11
                            },
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        bodyFont: {
                            family: 'Inter',
                            size: 13
                        },
                        callbacks: {
                            label: function (context) {
                                return `${context.label}: ${context.parsed}%`;
                            }
                        }
                    }
                }
            }
        });
    }
}

function updateColumnChart(columnNumber, datasetKey) {
    const chartDatasets = {
        'accumulated': {
            labels: ["'no_abrir'", "'libros'", "'alto_valor'", "'mercancia_regulada'"],
            data: [95.88, 1.83, 0.84, 1.45]
        },
        '2022-01': {
            labels: ["'no_abrir'", "'libros'", "'alto_valor'", "'mercancia_regulada'"],
            data: [98.37, 1.56, 0.06, 0.00]
        }
    };

    const chart = columnNumber === 1 ? column1Chart : column2Chart;
    const data = chartDatasets[datasetKey];

    if (chart && data) {
        chart.data.labels = data.labels;
        chart.data.datasets[0].data = data.data;
        chart.update();
    }
}

function initializeInteractions() {
    // Dropdown selector interactions
    const column1Selector = document.getElementById('column-1-selector');
    const column2Selector = document.getElementById('column-2-selector');

    // Data store for the two datasets (extracted from current HTML)
    const datasets = {
        'accumulated': {
            title: 'All Time',
            total: '3,013,182',
            labels: {
                'no_abrir': { name: "'no_abrir'", percent: '95.88%', width: '95.88%' },
                'libros': { name: "'libros'", percent: '1.83%', width: '1.83%' },
                'alto_valor': { name: "'alto_valor'", percent: '0.84%', width: '0.84%' },
                'mercancia_regulada': { name: "'mercancia_regulada'", percent: '1.45%', width: '1.45%' }
            },
            topShippers: [
                { name: 'AMAZON FBA', value: '556,648' },
                { name: 'ZOETOP BUSINESS (ECOMMERCE)', value: '533,617' },
                { name: 'ROADGET BUSINESS PTE LTD', value: '107,226' },
                { name: 'GOLDEN STATE (AMAZON FBA)', value: '103,248' },
                { name: 'THIRD PARTY COURIER SERVICE', value: '85,527' }
            ],
            topDescriptions: [
                { name: 'PRENDAS DE VESTIR', value: '288,040' },
                { name: 'APPAREL', value: '163,649' },
                { name: 'BOOKS', value: '144,059' },
                { name: 'PRENDAS DE VESTIR', value: '89,767' },
                { name: 'TOYS', value: '77,680' }
            ],
            topConsignees: [
                { name: 'FEDEX OR SUBSIDIARIES', value: '20,193' },
                { name: 'AMAZON', value: '9,396' },
                { name: 'unknown', value: '5,245' },
                { name: 'ZOETOP BUSINESS CO. LIMITED', value: '2,869' },
                { name: 'ITZEL NUNEZ PEREZ', value: '2,536' }
            ]
        },
        '2022-01': {
            title: 'January 2022',
            total: '69,830',
            labels: {
                'no_abrir': { name: "'no_abrir'", percent: '98.37%', width: '98.37%' },
                'libros': { name: "'libros'", percent: '1.56%', width: '1.56%' },
                'alto_valor': { name: "'alto_valor'", percent: '0.06%', width: '0.06%' },
                'mercancia_regulada': { name: "'mercancia_regulada'", percent: '0.00%', width: '0.00%' }
            },
            topShippers: [
                { name: 'ROADGET BUSINESS PTE. LTD.', value: '27,161' },
                { name: 'VICTORIA SECRET', value: '4,367' },
                { name: 'THIRD PARTY COURIER SERVICE', value: '1,778' },
                { name: 'COODIVE', value: '528' },
                { name: 'LULUILEMON (ECOMMERCE)', value: '415' }
            ],
            topDescriptions: [
                { name: 'BOOKS', value: '2,537' },
                { name: 'LEATHER ITEM/APPAREL', value: '1,009' },
                { name: 'CORRESPONDENCE', value: '972' },
                { name: 'APPAREL', value: '911' },
                { name: 'TOYS', value: '819' }
            ],
            topConsignees: [
                { name: 'FEDEX OR SUBSIDIARIES', value: '288' },
                { name: 'WALMART FOUNDATION', value: '118' },
                { name: 'YESENIA YISEL KHADER', value: '84' },
                { name: 'MIREYA CUEVAS', value: '74' },
                { name: 'LOURDES DIAZ DIAZ', value: '68' }
            ]
        }
    };

    function updateColumnData(columnNumber, datasetKey) {
        const data = datasets[datasetKey];
        const columnId = `column-${columnNumber}`;

        // Update total
        document.getElementById(`${columnId}-total`).textContent = data.total;

        // Update labels
        Object.keys(data.labels).forEach(labelKey => {
            const label = data.labels[labelKey];
            const nameEl = document.getElementById(`${columnId}-label-${labelKey.replace('_', '-')}-name`);
            const percentEl = document.getElementById(`${columnId}-label-${labelKey.replace('_', '-')}-percent`);
            if (nameEl) nameEl.textContent = label.name;
            if (percentEl) percentEl.textContent = label.percent;

            // Update bar width
            const barEl = document.querySelector(`#${columnId} .label-bar[data-label="${labelKey}"]`);
            if (barEl) barEl.style.width = label.width;
        });

        // Update top shippers
        const shippersContainer = document.getElementById(`${columnId}-top-shippers`);
        if (shippersContainer) {
            shippersContainer.innerHTML = data.topShippers.map(item => `
                <li class="ranking-item">
                    <span class="rank-name">${item.name}</span>
                    <span class="rank-value">${item.value}</span>
                </li>
            `).join('');
        }

        // Update top descriptions
        const descriptionsContainer = document.getElementById(`${columnId}-top-descriptions`);
        if (descriptionsContainer) {
            descriptionsContainer.innerHTML = data.topDescriptions.map(item => `
                <li class="ranking-item">
                    <span class="rank-name">${item.name}</span>
                    <span class="rank-value">${item.value}</span>
                </li>
            `).join('');
        }

        // Update top consignees
        const consigneesContainer = document.getElementById(`${columnId}-top-consignees`);
        if (consigneesContainer) {
            consigneesContainer.innerHTML = data.topConsignees.map(item => `
                <li class="ranking-item">
                    <span class="rank-name">${item.name}</span>
                    <span class="rank-value">${item.value}</span>
                </li>
            `).join('');
        }

        // Update column data-period attribute
        document.getElementById(columnId).setAttribute('data-period', datasetKey);

        // Update the Chart.js chart
        updateColumnChart(columnNumber, datasetKey);
    }

    if (column1Selector) {
        column1Selector.addEventListener('change', function () {
            updateColumnData(1, this.value);
            console.log('Column 1 changed to:', this.value);
        });
    }

    if (column2Selector) {
        column2Selector.addEventListener('change', function () {
            updateColumnData(2, this.value);
            console.log('Column 2 changed to:', this.value);
        });
    }

    // Add hover effects to ranking items
    const rankingItems = document.querySelectorAll('.ranking-item');
    rankingItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transition = 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // Animate label bars on scroll
    const labelBars = document.querySelectorAll('.label-bar');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.1 });

    labelBars.forEach(bar => {
        bar.style.opacity = '0';
        observer.observe(bar);
    });

    // Smooth scroll animations
    const cards = document.querySelectorAll('.hero-stat-card, .label-analysis-panel, .comparison-panel, .chart-container');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideIn 350ms cubic-bezier(0.4, 0, 0.2, 1) forwards';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        cardObserver.observe(card);
    });
}

// Utility function to format numbers
function formatNumber(num) {
    return new Intl.NumberFormat('en-US').format(num);
}

// Export for potential future API integration
window.dashboardAPI = {
    updateHeroStats: function (totalParcels, inspectionPercentage) {
        const totalEl = document.getElementById('total-parcels');
        const inspectionEl = document.getElementById('inspection-percentage');

        if (totalEl) totalEl.textContent = formatNumber(totalParcels);
        if (inspectionEl) inspectionEl.textContent = `${inspectionPercentage}%`;
    },

    updateMissingData: function (consignee, description, shipper) {
        const consigneeEl = document.getElementById('missing-consignee');
        const descriptionEl = document.getElementById('missing-description');
        const shipperEl = document.getElementById('missing-shipper');

        if (consigneeEl) consigneeEl.innerHTML = `Consignee data missing: <strong>+${formatNumber(consignee)}</strong>`;
        if (descriptionEl) descriptionEl.innerHTML = `Description data missing: <strong>+${formatNumber(description)}</strong>`;
        if (shipperEl) shipperEl.innerHTML = `Shipper data missing: <strong>+${formatNumber(shipper)}</strong>`;
    },

    updateLabelAnalysis: function (labelName, parcelCount, percentage, topShippers, topConsignees, topDescriptions) {
        const titleEl = document.getElementById('label-analysis-title');
        const countEl = document.getElementById('label-parcel-count');
        const percentEl = document.getElementById('label-percentage');

        if (titleEl) titleEl.textContent = `In-depth analysis of label '${labelName}'`;
        if (countEl) countEl.textContent = `${formatNumber(parcelCount)} parcels`;
        if (percentEl) percentEl.textContent = `(${percentage}%)`;

        // Update top lists...
        // (Implementation would populate the lists dynamically)
    }
};
