// BMI Calculator Functionality
document.addEventListener('DOMContentLoaded', function() {
    const bmiForm = document.getElementById('bmiForm');
    const resultSection = document.getElementById('resultSection');
    const bmiValue = document.getElementById('bmiValue');
    const bmiCategory = document.getElementById('bmiCategory');
    const bmiDescription = document.getElementById('bmiDescription');
    const resetBtn = document.getElementById('resetBtn');
    
    if (bmiForm) {
        bmiForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateBMI();
        });
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            resetCalculator();
        });
    }
    
    // Height unit change handler
    const heightUnit = document.getElementById('heightUnit');
    if (heightUnit) {
        heightUnit.addEventListener('change', function() {
            updateHeightPlaceholder();
        });
        updateHeightPlaceholder(); // Initialize placeholder
    }
});

function calculateBMI() {
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const heightUnit = document.getElementById('heightUnit');
    
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);
    const unit = heightUnit.value;
    
    // Validation
    if (!height || !weight || height <= 0 || weight <= 0) {
        alert('Please enter valid height and weight values.');
        return;
    }
    
    // Convert height to meters if needed
    let heightInMeters = height;
    if (unit === 'cm') {
        heightInMeters = height / 100;
    }
    
    // Calculate BMI
    const bmi = weight / (heightInMeters * heightInMeters);
    const roundedBMI = Math.round(bmi * 10) / 10;
    
    // Determine category
    const category = getBMICategory(roundedBMI);
    
    // Display results
    displayResults(roundedBMI, category);
}

function getBMICategory(bmi) {
    if (bmi < 18.5) {
        return {
            name: 'Underweight',
            description: 'You may need to gain weight. Consider consulting with our nutritionist for dietary advice.',
            color: '#5bc0de'
        };
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        return {
            name: 'Normal weight',
            description: 'Congratulations! You have a healthy body weight. Maintain your current lifestyle.',
            color: '#5cb85c'
        };
    } else if (bmi >= 25 && bmi <= 29.9) {
        return {
            name: 'Overweight',
            description: 'You may need to lose weight. Consider increasing physical activity and improving your diet.',
            color: '#f0ad4e'
        };
    } else {
        return {
            name: 'Obese',
            description: 'It is recommended to consult with our healthcare professionals for weight management advice.',
            color: '#d9534f'
        };
    }
}

function displayResults(bmi, category) {
    const bmiValue = document.getElementById('bmiValue');
    const bmiCategory = document.getElementById('bmiCategory');
    const bmiDescription = document.getElementById('bmiDescription');
    const resultSection = document.getElementById('resultSection');
    
    // Update result elements
    bmiValue.textContent = bmi;
    bmiValue.style.color = category.color;
    
    bmiCategory.textContent = category.name;
    bmiCategory.style.color = category.color;
    
    bmiDescription.textContent = category.description;
    
    // Show result section
    resultSection.style.display = 'block';
    
    // Scroll to results
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function resetCalculator() {
    const bmiForm = document.getElementById('bmiForm');
    const resultSection = document.getElementById('resultSection');
    
    // Reset form
    bmiForm.reset();
    
    // Hide result section
    resultSection.style.display = 'none';
    
    // Scroll to form
    bmiForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function updateHeightPlaceholder() {
    const heightUnit = document.getElementById('heightUnit');
    const heightInput = document.getElementById('height');
    
    if (heightUnit.value === 'cm') {
        heightInput.placeholder = 'e.g., 175';
    } else {
        heightInput.placeholder = 'e.g., 1.75';
    }
}

// Add input validation to prevent negative numbers
document.addEventListener('DOMContentLoaded', function() {
    const numberInputs = document.querySelectorAll('input[type="number"]');
    
    numberInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value < 0) {
                this.value = '';
            }
        });
    });
});