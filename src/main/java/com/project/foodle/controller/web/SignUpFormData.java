package com.project.foodle.controller.web;

import com.project.foodle.domain.User;
import com.project.foodle.repository.UserRepository;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.awt.desktop.SystemSleepEvent;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
public class SignUpFormData {
    private static UserRepository userRepository;

    public SignUpFormData(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @RequestMapping(value = "/registrationInfo", method = RequestMethod.POST)
    @CrossOrigin
    @Transactional
    public User registrationFormData(@RequestBody Map<String, String> fields) {

        String username = fields.get("username");
        String email = fields.get("email");
        String password = fields.get("password");
        String type = fields.get("type");

        //Password criteria
        Pattern letter = Pattern.compile("[a-zA-z]");
        Pattern digit = Pattern.compile("[0-9]");
        Pattern special = Pattern.compile ("[!@#$%&*()_+=|<>?{}\\[\\]~-]");

        Matcher hasLetter = letter.matcher(password);
        Matcher hasDigit = digit.matcher(password);
        Matcher hasSpecial = special.matcher(password);

        List<User> usernames = userRepository.findByUsername(username);
        List<User> emails = userRepository.findByEmail(email);

        if(!usernames.isEmpty()) {
            userRepository.deleteByUsername(username);
            throw new Error("username already in use");
        } else if (!emails.isEmpty()) {
            userRepository.deleteByEmail(email);
            throw new Error("email already in use");
        } else if (password.length() < 8 || !hasLetter.find() || !hasDigit.find() || !hasSpecial.find()) {
            userRepository.deleteByPassword(password);
            throw new Error("password must be at least 8 characters, contain at least 1 numeric, and 1 special character");
        } else {
            User user = new User(null, username, password, email, type);
            userRepository.save(user);

            return user;
        }
    }
}
