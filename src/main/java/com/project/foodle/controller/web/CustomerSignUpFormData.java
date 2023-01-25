package com.project.foodle.controller.web;

import com.project.foodle.domain.Customer;
import com.project.foodle.domain.User;
import com.project.foodle.repository.CustomerRepository;
import com.project.foodle.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;

@RestController
public class CustomerSignUpFormData {

    private static CustomerRepository customerRepository;
    private static UserRepository userRepository;

    public CustomerSignUpFormData(CustomerRepository customerRepository, UserRepository userRepository) {
        this.customerRepository = customerRepository;
        this.userRepository = userRepository;
    }

    @RequestMapping(value="/customerRegistrationInfo", method = RequestMethod.POST)
    @CrossOrigin
    @Transactional
    public Customer saveCustomerInfo(@RequestBody Map<String, String> params) {
        String name = params.get("name");
        String surname = params.get("surname");
        String phone = params.get("phone");
        String username = params.get("username");

        List<User> userInfo = userRepository.findByUsername(username);

        User customerId = userInfo.get(0);

        Customer customer = new Customer(null, name, surname, phone, customerId);
        customerRepository.save(customer);

        return customer;
    }
}
