package org.example.staymate.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name="Menu_store")
public class MenuStore {
    @Id
    private String phoneNumber;
    private String message;
}
