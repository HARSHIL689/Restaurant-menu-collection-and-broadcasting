package org.example.backendi.repo;

import jakarta.persistence.LockModeType;
import jakarta.persistence.QueryHint;
import org.example.backendi.model.MenuStore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

public interface MenuStoreRepository extends JpaRepository<MenuStore,Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @QueryHints({
            @QueryHint(name = "jakarta.persistence.lock.timeout", value = "3000")
    })
    @Query("SELECT m FROM MenuStore m WHERE m.phone = :phone")
    Optional<MenuStore> findForUpdate(@Param("phone") String phone);
    Optional<MenuStore> findByPhone(String phone);
    @Query("""
    SELECT m FROM MenuStore m
    WHERE m.expiresAt > CURRENT_TIMESTAMP
    AND m.OrerCount < m.limit
    """)
    List<MenuStore> findActiveMenus();
    @Query("""
SELECT m FROM MenuStore m
WHERE m.expiresAt > CURRENT_TIMESTAMP
AND m.OrerCount < m.limit
AND (
    LOWER(m.menu) LIKE LOWER(CONCAT('%', :keyword, '%'))
    OR LOWER(m.restaurant.RestaurantName) LIKE LOWER(CONCAT('%', :keyword, '%')) 
)
""")
    List<MenuStore> searchActiveMenus(@Param("keyword") String keyword);

}